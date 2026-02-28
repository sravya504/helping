// // firebase.js
// const admin = require('firebase-admin');
// require('dotenv').config();

// // Check if Firebase has already been initialized
// const app = admin.apps.length
//   ? admin.app() // reuse existing default app
//   : admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: process.env.FIREBASE_PROJECT_ID,
//         clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//         privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//       }),
//       databaseURL: "https://helping-ba452-default-rtdb.asia-southeast1.firebasedatabase.app",
//     });

// const db = admin.database();
// module.exports = db;



// firebase.js
const admin = require("firebase-admin");
require("dotenv").config();

// Safe Firebase init for v9
try {
  admin.app(); // try to get default app
} catch (err) {
  // If not initialized, initialize now
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = admin.database();
module.exports = db;