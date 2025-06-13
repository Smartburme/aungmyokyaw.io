// firebase-config.js

// Import Firebase core and services from CDN (Modular SDK)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ✅ Your Firebase project config (no need to edit unless you change Firebase project)
const firebaseConfig = {
  apiKey: "AIzaSyCK8xFznYs4FFuH-JBmXhX69I9iIdFC-DY",
  authDomain: "smart-burme-ai.firebaseapp.com",
  databaseURL: "https://smart-burme-ai-default-rtdb.firebaseio.com",
  projectId: "smart-burme-ai",
  storageBucket: "smart-burme-ai.appspot.com",
  messagingSenderId: "1057673784315",
  appId: "1:1057673784315:web:b7004e00ce88b7ecd3b95e",
  measurementId: "G-VDB178C50B"
};

// ✅ Initialize Firebase app
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firebase services
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const rtdb = getDatabase(app); // Realtime Database

// ✅ Export for use in script.js
export { app, analytics, auth, db, storage, rtdb };
