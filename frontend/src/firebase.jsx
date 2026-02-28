// firebase.jsx
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChkiNnLS3INsTFezWGJ5JRccsPPx0f3nc",
  authDomain: "helping-ba452.firebaseapp.com",
  projectId: "helping-ba452",
  storageBucket: "helping-ba452.appspot.com",
  messagingSenderId: "699143826639",
  appId: "1:699143826639:web:c8cdba5a460e4eb42f1bba",
  databaseURL: "https://helping-ba452-default-rtdb.asia-southeast1.firebasedatabase.app" // ✅ add this
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);   // ✅ export database reference
export const auth = getAuth(app);      // optional, if you need auth
export default app;