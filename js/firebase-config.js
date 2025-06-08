// firebase-config.js

// Firebase SDK functions import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js"; // ✅ Realtime DB import

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK8xFznYs4FFuH-JBmXhX69I9iIdFC-DY",
  authDomain: "smart-burme-ai.firebaseapp.com",
  databaseURL: "https://smart-burme-ai-default-rtdb.firebaseio.com", // ✅ Required for Realtime DB
  projectId: "smart-burme-ai",
  storageBucket: "smart-burme-ai.appspot.com",
  messagingSenderId: "1057673784315",
  appId: "1:1057673784315:web:b7004e00ce88b7ecd3b95e",
  measurementId: "G-VDB178C50B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const rtdb = getDatabase(app); // ✅ Realtime DB init
const auth = getAuth(app);
const storage = getStorage(app);

// Export instances
export { app, analytics, db, rtdb, auth, storage };
