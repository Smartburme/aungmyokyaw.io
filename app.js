// 📦 Firebase Login / Upload / AI API Logic

// Firebase သုံးရန် config import import { firebaseConfig } from './firebase.config.js'; import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js"; import { getAuth, onAuthStateChanged, signInAnonymously } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js"; import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

// Firebase Init const app = initializeApp(firebaseConfig); const auth = getAuth(app); const storage = getStorage(app);

// Anonymous Login onAuthStateChanged(auth, user => { if (!user) signInAnonymously(auth); });

// 🔐 Get API key from localStorage function getApiKey() { return localStorage.getItem('OPENAI_API_KEY'); }

// 🧠 AI Chat export async function askAI(text) { const apiKey = getApiKey(); const response = await fetch("https://api.openai.com/v1/chat/completions", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": Bearer ${apiKey} }, body: JSON.stringify({ model: "gpt-4", messages: [{ role: "user", content: text }] }) }); const data = await response.json(); const reply = data.choices[0].message.content; localStorage.setItem('chatHistory', reply); return reply; }

// 📤 Upload Photo to Firebase export async function uploadImage(file) { const storageRef = ref(storage, 'uploads/' + file.name); const snapshot = await uploadBytes(storageRef, file); const downloadURL = await getDownloadURL(snapshot.ref); return downloadURL; }

// 🖼️ Text-to-Image using DALL·E export async function generateImage(prompt) { const apiKey = getApiKey(); const response = await fetch("https://api.openai.com/v1/images/generations", { method: "POST", headers: { "Content-Type": "application/json", "Authorization": Bearer ${apiKey} }, body: JSON.stringify({ model: "dall-e-3", prompt: prompt, n: 1, size: "512x512" }) }); const data = await response.json(); const url = data.data[0].url; localStorage.setItem('lastGeneratedImage', url); return url; }

