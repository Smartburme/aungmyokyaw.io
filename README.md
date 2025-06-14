# Smart Burme AI App

Smart Burme is a modern web AI app that allows users to:

* Log in / Sign up using Firebase Authentication
* Upload photos to Firebase Storage
* Generate images using OpenAI (Text to Photo)

## 🌐 Live Features

* Firebase Auth & Storage
* OpenAI DALL·E Image Generation
* Responsive Mobile-friendly UI

## 📁 Project Structure

```
smart-burme/
├── index.html                # Main HTML page
├── style.css                 # Stylesheet for UI
├── app.js                    # JavaScript logic (auth, upload, generate)
├── firebase.config.js        # Firebase project configuration
├── .env                      # Store OpenAI API Key (ignored by git)
├── .gitignore                # Ignore .env and node_modules
└── README.md                 # Project documentation
```

## 🔐 Environment Setup

Create a `.env` file and add your OpenAI API key:

```
OPENAI_API_KEY=your_openai_api_key_here
```

Make sure `.env` is listed in `.gitignore`:

```
.env
```

## ⚙️ Firebase Setup

In `firebase.config.js`, paste your Firebase config:

```js
// firebase.config.js
const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app",
  storageBucket: "your-app.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdefg"
};
firebase.initializeApp(firebaseConfig);
```

## 🚀 Run Locally

You can test this project locally using VS Code Live Server or any static server.

## 📸 Demo Features

* Upload any image file to Firebase
* Enter text to generate a photo using OpenAI DALL·E API
* Mobile-first layout and smooth UX

---

© 2025 Smart Burme AI
