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
const admin = require("firebase-admin"); // use for auth only
const cloudinary = require("./cloudinary");
const db = require("./firebase"); // safe Firebase app
require("dotenv").config();
const streamifier = require("streamifier");

const app = express();
app.use(cors());
app.use(express.json());

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

    // Use admin.auth() from already initialized app
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
// 🔒 Admin Image Upload
// ==============================
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { locations } = req.body;
    const file = req.file;
    if (!file) return res.status(400).send("No file uploaded");

    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "images" },
      async (error, result) => {
        if (error) return res.status(500).send(error);

        // Store metadata in Firebase Realtime Database
        const newRef = db.ref("images").push();
        await newRef.set({
          url: result.secure_url,
          locations: Array.isArray(locations)
            ? locations
            : JSON.parse(locations),
          createdAt: Date.now(),
        });

        res.json({ message: "Image uploaded successfully", url: result.secure_url });
      }
    );

    streamifier.createReadStream(file.buffer).pipe(uploadStream);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));