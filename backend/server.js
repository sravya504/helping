// // server.js

// const express = require("express");
// const cors = require("cors");
// const admin = require("firebase-admin");
// const serviceAccount = require("./serviceAccountKey.json");

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Initialize Firebase Admin
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // ==============================
// // 🔐 Admin Verification Middleware
// // ==============================
// const verifyAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({ message: "No token provided" });
//     }

//     const token = authHeader.split("Bearer ")[1];

//     // Verify Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(token);

//     // Check admin email (simple version)
//     if (decodedToken.email === "n210307@rguktn.ac.in") {
//       req.user = decodedToken;
//       next();
//     } else {
//       return res.status(403).json({ message: "Access denied. Not an admin." });
//     }

//   } catch (error) {
//     console.error("Token verification failed:", error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

// // ==============================
// // 🌍 Public Route
// // ==============================
// app.get("/", (req, res) => {
//   res.send("Backend is running successfully 🚀");
// });

// // ==============================
// // 🔒 Protected Admin Route
// // ==============================
// app.get("/admin/dashboard", verifyAdmin, (req, res) => {
//   res.json({
//     message: "Welcome Admin 🎉",
//     user: req.user.email,
//   });
// });

// // ==============================
// // 🚀 Start Server
// // ==============================
// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

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
app.use(cors());
app.use(express.json());
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
// 🌍 Public Route
// ==============================
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});


app.get("/admin/dashboard", verifyAdmin, (req, res) => {
  res.json({
    message: "Welcome Admin 🎉",
    user: req.user.email,
  });
});


// ==============================
// 🔒 Image Upload
// ==============================
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post("/upload", upload.array("images"), async (req, res) => {

  try {

    const { locations } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).send("No files uploaded");
    }

    const parsedLocations = Array.isArray(locations)
      ? locations
      : JSON.parse(locations);

    const uploadTime = Date.now();

    // store images temporarily
    const uploadedImages = [];

    // upload to Cloudinary one by one
    for (let i = 0; i < files.length; i++) {

      const file = files[i];

      const result = await new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "images" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);

      });

      // push to temporary array
      uploadedImages.push({
        url: result.secure_url,
        locations: parsedLocations,
        createdAt: uploadTime
      });

    }

    // now push to firebase in SAME ORDER
    for (let img of uploadedImages) {

      const newRef = db.ref("images").push();

      await newRef.set(img);

    }

    res.json({
      message: "Images uploaded successfully",
      total: uploadedImages.length
    });

  } catch (err) {

    console.error(err);
    res.status(500).send("Server Error");

  }

});
// app.delete("/delete-image/:id", verifyAdmin, async (req, res) => {
//   try {

//     const imageId = req.params.id;

//     const snapshot = await db.ref("images/" + imageId).once("value");
//     const imageData = snapshot.val();

//     if (!imageData) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     const locations = imageData.locations || [];

//     console.log("Current locations:", locations);

//     // remove gallery from locations
//     const updatedLocations = locations.filter(loc => loc !== "gallery");

//     console.log("Updated locations:", updatedLocations);

//     // ONLY update locations (never delete record)
//     await db.ref("images/" + imageId + "/locations").set(updatedLocations);

//     res.json({
//       message: "Gallery removed, carousel kept"
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Delete failed" });
//   }
// });
// app.delete("/delete-image/:id", verifyAdmin, async (req, res) => {
//   try {

//     const imageId = req.params.id;

//     const snapshot = await db.ref("images/" + imageId).once("value");
//     const imageData = snapshot.val();

//     if (!imageData) {
//       return res.status(404).json({ message: "Image not found" });
//     }

//     const locations = imageData.locations || [];
//     const imageUrl = imageData.url;

//     console.log("Current locations:", locations);

//     // CASE 1: Image is in both carousel and gallery
//     if (locations.includes("carousel") && locations.includes("gallery")) {

//       const updatedLocations = locations.filter(loc => loc !== "gallery");

//       await db.ref("images/" + imageId + "/locations").set(updatedLocations);

//       return res.json({
//         message: "Gallery removed, carousel kept"
//       });

//     }

//     // CASE 2: Image only belongs to gallery
//     else {

//       // get cloudinary public id
//       const publicId = getPublicIdFromUrl(imageUrl);

//       // delete from cloudinary
//       await cloudinary.uploader.destroy(publicId);

//       // delete from firebase
//       await db.ref("images/" + imageId).remove();

//       return res.json({
//         message: "Image deleted from Firebase and Cloudinary"
//       });

//     }

//   } catch (err) {

//     console.error(err);
//     res.status(500).json({ message: "Delete failed" });

//   }
// });

app.delete("/delete-image/:id", verifyAdmin, async (req, res) => {
  try {

    const imageId = req.params.id;

    const snapshot = await db.ref("images/" + imageId).once("value");
    const imageData = snapshot.val();

    if (!imageData) {
      return res.status(404).json({ message: "Image not found" });
    }
     const locations = imageData.locations || [];
    const imageUrl = imageData.url;
    if (locations.includes("carousel") && locations.includes("gallery")) {

      const updatedLocations = locations.filter(loc => loc !== "gallery");

      await db.ref("images/" + imageId + "/locations").set(updatedLocations);

      return res.json({
        message: "Gallery removed, carousel kept"
      });

    }

    // get cloudinary public id
    const publicId = getPublicIdFromUrl(imageUrl);

    console.log("Deleting image:", publicId);

    // delete from cloudinary
    await cloudinary.uploader.destroy(publicId);

    // delete from firebase
    await db.ref("images/" + imageId).remove();

    return res.json({
      message: "Image deleted successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Delete failed" });
  }
});
// ==============================
// 📅 Create Event (Admin)
// ==============================

/* ===============================
   ADD EVENT
================================ */

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
              .toUpperCase()
          },
          createdAt: Date.now()
        };

        const newRef = db.ref("events").push();
        await newRef.set(eventData);

        res.json({
          id: newRef.key,
          ...eventData
        });

      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});

/* ===============================
   GET EVENTS
================================ */

app.get("/events", async (req, res) => {

  try {

    const snapshot = await db.ref("events").once("value");

    const data = snapshot.val() || {};

    const events = Object.keys(data).map(id => ({
      id,
      ...data[id]
    }));

    res.json(events);

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Failed to fetch events" });

  }

});
/* ===============================
   DELETE EVENT
================================ */

app.delete("/events/:id", async (req, res) => {

  await db.ref(`events/${req.params.id}`).remove();

  res.json({ message: "Event deleted" });

});


// ==============================
// 🚀 Start Server
// ==============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});