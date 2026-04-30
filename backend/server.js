// server.js
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const admin = require("firebase-admin");
const cloudinary = require("./cloudinary");
const db = require("./firebase");
require("dotenv").config();
const streamifier = require("streamifier");

const app = express();
app.use(
  cors({
    origin: "*"
  }),
);
app.use(express.json());

// ==============================
// 🔧 Helper
// ==============================
function getPublicIdFromUrl(url) {
  const parts = url.split("/upload/")[1];
  const withoutVersion = parts.split("/").slice(1).join("/");
  const publicId = withoutVersion.replace(/\.[^/.]+$/, "");
  return publicId;
}

// ==============================
// 🔐 Admin Verification Middleware
// ==============================
const verifyAdmin = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split("Bearer ")[1];
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (decodedToken.email === process.env.ADMIN_EMAIL) {
      req.user = decodedToken;
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }
  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==============================
// 🌍 Public Routes
// ==============================
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

app.get("/modify/dashboard", verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin 🎉",
    user: req.user.email,
  });
});

// ==============================
// 🔒 Image Upload (DUAL SYSTEM)
// ==============================
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.array("images"), async (req, res) => {
  try {
    const { locations, department, type, title, description } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    let parsedLocations = [];

    if (locations) {
      parsedLocations = Array.isArray(locations)
        ? locations
        : JSON.parse(locations);
    }

    const uploadTime = Date.now();
    const uploadedImages = [];

    // Upload to Cloudinary
    for (let file of files) {
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      uploadedImages.push({
        url: result.secure_url,
        locations: parsedLocations,
        department: department || "general",
        type: type || "general",
        createdAt: uploadTime,
      });
    }

    // ==============================
    // 🔁 SAVE DATA (BOTH SYSTEMS)
    // ==============================
    for (let img of uploadedImages) {
      // ✅ OLD SYSTEM (unchanged)
      const newRef = db.ref("images").push();
      await newRef.set(img);

      // ✅ NEW SYSTEM (departments)
      if (department && type) {
        const refPath = `departments/${department}/${type}`;
        const deptRef = db.ref(refPath).push();

        if (type === "contributions") {
          await deptRef.set({
            url: img.url,
            title: title || "",
            description: description || "",
            createdAt: img.createdAt,
          });
        } else {
          await deptRef.set({
            url: img.url,
            createdAt: img.createdAt,
          });
        }
      }
    }

    res.json({
      message: "Images uploaded successfully",
      total: uploadedImages.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// ==============================
// 📂 OLD IMAGES API (UNCHANGED)
// ==============================
app.get("/images", async (req, res) => {
  try {
    const snapshot = await db.ref("images").once("value");
    const data = snapshot.val() || {};

    const images = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch images" });
  }
});

// ==============================
// 🆕 NEW DEPARTMENT API
// ==============================
app.get("/department-images", async (req, res) => {
  try {
    const { department, type } = req.query;

    if (!department || !type) {
      return res.status(400).json({ message: "Department and type required" });
    }

    const snapshot = await db
      .ref(`departments/${department}/${type}`)
      .once("value");

    const data = snapshot.val() || {};

    const images = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

    res.json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch department images" });
  }
});

// ==============================
// 🆕 NEW DELETE (DEPARTMENT)
// ==============================
app.delete(
  "/department-wise/delete-image/:id",
  verifyAdmin,
  async (req, res) => {
    try {
      const { department, type } = req.query;
      const imageId = req.params.id;

      if (!department || !type) {
        return res
          .status(400)
          .json({ message: "Department and type required" });
      }

      const refPath = `departments/${department}/${type}/${imageId}`;

      const snapshot = await db.ref(refPath).once("value");
      const imageData = snapshot.val();

      if (!imageData) {
        return res.status(404).json({ message: "Image not found" });
      }

      const publicId = getPublicIdFromUrl(imageData.url);

      await cloudinary.uploader.destroy(publicId);
      await db.ref(refPath).remove();

      res.json({ message: "Department image deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Delete failed" });
    }
  },
);

// Get contributions
app.get("/contributions", async (req, res) => {
  try {
    const { department } = req.query;
    if (!department)
      return res.status(400).json({ message: "Department required" });

    const snapshot = await db
      .ref(`departments/${department}/contributions`)
      .once("value");
    const data = snapshot.val() || {};
    const contributions = Object.keys(data).map((id) => ({ id, ...data[id] }));
    res.json(contributions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch contributions" });
  }
});

// Delete contribution
app.delete("/contributions/delete/:id", verifyAdmin, async (req, res) => {
  try {
    const { department } = req.query;
    const id = req.params.id;
    if (!department)
      return res.status(400).json({ message: "Department required" });

    const refPath = `departments/${department}/contributions/${id}`;
    const snapshot = await db.ref(refPath).once("value");
    const data = snapshot.val();
    if (!data)
      return res.status(404).json({ message: "Contribution not found" });

    // Optional: delete from Cloudinary if image exists
    if (data.url) {
      const publicId = getPublicIdFromUrl(data.url);
      await cloudinary.uploader.destroy(publicId);
    }

    await db.ref(refPath).remove();
    res.json({ message: "Contribution deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ==============================
// 📅 EVENTS (UNCHANGED)
// ==============================
app.post("/events", upload.single("image"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const { title, desc, fullDate, time, location } = req.body;

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "events" },
      async (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ message: "Cloudinary upload failed" });
        }

        const imageUrl = result.secure_url;
        const dateObj = new Date(fullDate);

        const eventData = {
          img: imageUrl,
          title,
          desc,
          fullDate,
          time,
          location,
          date: {
            day: dateObj.getDate(),
            month: dateObj
              .toLocaleString("default", { month: "short" })
              .toUpperCase(),
          },
          createdAt: Date.now(),
        };

        const newRef = db.ref("events").push();
        await newRef.set(eventData);

        res.json({
          id: newRef.key,
          ...eventData,
        });
      },
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/events", async (req, res) => {
  try {
    const snapshot = await db.ref("events").once("value");
    const data = snapshot.val() || {};

    const events = Object.keys(data).map((id) => ({
      id,
      ...data[id],
    }));

    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

app.delete("/events/:id", async (req, res) => {
  await db.ref(`events/${req.params.id}`).remove();
  res.json({ message: "Event deleted" });
});

// ==============================
// Upload Single Faculty
// ==============================
app.post(
  "/upload-faculty",
  verifyAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, type } = req.body;
      const file = req.file;

      if (!file || !name || !type)
        return res.status(400).json({ message: "All fields are required" });

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "faculty" },
          (err, result) => (err ? reject(err) : resolve(result)),
        );
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
      });

      const newRef = db.ref("faculty").push();
      await newRef.set({
        name,
        type,
        photo: result.secure_url,
        createdAt: Date.now(),
      });

      res.json({
        message: "Faculty added successfully",
        url: result.secure_url,
        id: newRef.key,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Faculty upload failed" });
    }
  },
);

// ==============================
// Get All Faculty
// ==============================
app.get("/faculty", verifyAdmin, async (req, res) => {
  try {
    const snapshot = await db.ref("faculty").once("value");
    const data = snapshot.val();
    const facultyArray = data
      ? Object.keys(data).map((key) => ({
          id: key,
          name: data[key].name,
          type: data[key].type,
          photo: data[key].photo,
        }))
      : [];
    res.json(facultyArray);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch faculty" });
  }
});

// ==============================
// Delete Faculty
// ==============================
app.delete("/delete-faculty/:id", verifyAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const snapshot = await db.ref("faculty/" + id).once("value");
    const data = snapshot.val();
    if (!data) return res.status(404).json({ message: "Faculty not found" });

    const publicId = getPublicIdFromUrl(data.photo);
    await cloudinary.uploader.destroy(publicId);
    await db.ref("faculty/" + id).remove();

    res.json({ message: "Faculty deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ==============================
// Delete Image (Gallery / Carousel)
// ==============================
app.delete("/delete-image/:id", verifyAdmin, async (req, res) => {
  try {
    const imageId = req.params.id;
    const snapshot = await db.ref("images/" + imageId).once("value");
    const imageData = snapshot.val();

    if (!imageData) return res.status(404).json({ message: "Image not found" });

    const locations = imageData.locations || [];
    const imageUrl = imageData.url;

    if (locations.includes("carousel") && locations.includes("gallery")) {
      const updatedLocations = locations.filter((loc) => loc !== "gallery");
      await db.ref("images/" + imageId + "/locations").set(updatedLocations);
      return res.json({ message: "Gallery removed, carousel kept" });
    }

    const publicId = getPublicIdFromUrl(imageUrl);
    await cloudinary.uploader.destroy(publicId);
    await db.ref("images/" + imageId).remove();

    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});

// ==============================
// 🚀 Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
