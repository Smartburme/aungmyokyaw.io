# Smart Burme ai
# Structure
  ```
index.html
├── styles.css
├── script.js
│   └── (Firebase SDK)
└── assets/
    ├── images/
    └── icons/
```
# SmartBurme AI Project Structure Summary

## 📁 Project Files Structure

### 1. Main Files
1. **index.html** - အဓိက website ဖိုင်အဖြစ် အားလုံးနှင့်ချိတ်ဆက်ထားသောဖိုင်
2. **styles.css** - Website ၏ အပြင်အဆင်ဒီဇိုင်းများအတွက် CSS ဖိုင်
3. **script.js** - Firebase နှင့် API ချိတ်ဆက်မှုများပါဝင်သော JavaScript ဖိုင်

### 2. Firebase Integration
4. **firebase-config.js** (optional) - Firebase configuration settings များအတွက် သီးသန့်ဖိုင်

### 3. Assets
5. **assets/**
   - **images/**
     - smartburme-logo.png (optional) - SVG အစား PNG logo သုံးလိုပါက
   - **icons/**
     - favicon.ico - Browser tab icon

## 📋 File Contents Summary

### 1. index.html
```html
<!DOCTYPE html>
<html>
<head>
    <!-- Metadata, title, and CSS links -->
</head>
<body>
    <header>
        <!-- SmartBurme AI Logo -->
        <!-- Navigation (if any) -->
    </header>
    
    <main>
        <!-- Chat Interface -->
        <div class="chat-container">
            <div id="chat-box"></div>
            <div class="input-area">
                <input type="text" id="user-input" placeholder="မေးခွန်းမေးပါ...">
                <button id="send-btn">ပို့ရန်</button>
            </div>
        </div>
    </main>

    <!-- Firebase and other JS scripts -->
</body>
</html>
```

### 2. styles.css
```css
/* Global Styles */
body {
    font-family: 'Padauk', sans-serif;
    /* ... */
}

/* Logo Styles */
.logo-container {
    /* ... */
}

/* Chat Interface Styles */
.chat-container {
    /* ... */
}

/* Responsive Design */
@media (max-width: 600px) {
    /* ... */
}
```

### 3. script.js
```javascript
// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    // ... other config
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    // Chat functionality
    // Firebase integration
    // API calls
});
```

### 4. firebase-config.js (optional)
```javascript
// Firebase configuration exported for use in other files
export const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    // ... other config
};
```

## 🛠️ Setup Instructions

1. **Firebase Setup**:
   - Firebase Console တွင် project အသစ်ဖန်တီးပါ
   - Realtime Database ကိုဖွင့်ပါ
   - Web app configuration ကိုရယူပြီး script.js တွင် အစားထိုးပါ

2. **API Setup**:
   - script.js ထဲတွင် `getAIResponse()` function ကို သင့် API endpoint နှင့်အစားထိုးပါ

3. **Deployment**:
   - Firebase Hosting သို့မဟုတ် GitHub Pages တွင် deploy လုပ်နိုင်သည်

## 🔄 File Dependencies

```
index.html
├── styles.css
├── script.js
│   └── (Firebase SDK)
└── assets/
    ├── images/
    └── icons/
```

ဤ structure သည်သင့် SmartBurme AI project အတွက် အခြေခံကျသော ဖိုင်တည်ဆောက်ပုံဖြစ်ပြီး လိုအပ်သလိုချဲ့ထွင်နိုင်ပါသည်။
