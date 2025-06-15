I'll help you split the single HTML file into three separate pages (index.html, chat.html, fri.html) with their corresponding JavaScript and CSS files, plus a shared Firebase configuration file.

Here's the organized structure:

```
project/
├── index.html
├── chat.html
├── fri.html
├── js/
│   ├── index.js
│   ├── chat.js
│   ├── fri.js
│   └── firebase.config.js
└── css/
    ├── index.css
    ├── chat.css
    └── fri.css
```

### 1. Shared Files (firebase.config.js and common CSS)

**js/firebase.config.js**
```javascript
// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
```

**css/common.css** (shared styles for all pages)
```css
body {
  font-family: 'Inter', sans-serif;
  background: #f9fafb;
}

/* Custom shadow for the phone container */
.phone-shadow {
  box-shadow: 10px 10px 20px #d9d9d9, -10px -10px 20px #ffffff;
}

/* Custom shadow for the floating button */
.btn-shadow {
  box-shadow: 0 6px 10px rgb(99 102 241 / 0.5);
}

/* Scrollbar hidden for horizontal scroll */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
.floating {
  animation: float 3s ease-in-out infinite;
}

/* Smaller bottom nav icons and text */
nav button i {
  font-size: 1.1rem;
}
nav button span {
  font-size: 11px;
}
```

### 2. index.html (Messages List)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <title>Messages</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link href="css/common.css" rel="stylesheet"/>
  <link href="css/index.css" rel="stylesheet"/>
</head>
<body class="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb]">
  <div class="phone-shadow bg-white rounded-[40px] w-[320px] h-[640px] flex flex-col p-5 relative">
    <!-- Search bar container -->
    <div class="relative bg-[#5c5bf2] rounded-[20px] h-[48px] flex items-center px-4">
      <input class="w-full bg-[#5c5bf2] placeholder-[#d1d1f9] text-white text-sm font-medium outline-none" placeholder="Search" type="text"/>
      <button class="ml-3 text-white text-lg">
        <i class="fas fa-camera"></i>
      </button>
    </div>
    
    <!-- Messages label -->
    <p class="text-[11px] font-semibold text-[#4b4b4b] mt-5 mb-3 select-none">Messages</p>
    
    <!-- Messages list -->
    <div class="flex flex-col gap-4 overflow-y-auto max-h-[480px] pr-1" id="messagesList">
      <!-- Messages will be loaded here by JavaScript -->
    </div>
    
    <!-- Bottom nav -->
    <nav class="flex justify-between items-center mt-auto pt-5 border-t border-[#e5e7eb] text-[#a3a3a3] text-[14px]">
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="homeBtn" type="button">
        <i class="fas fa-home"></i>
        <span class="mt-1">Home</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="tvBtn" type="button">
        <i class="fas fa-tv"></i>
        <span class="mt-1">TV</span>
      </button>
      <button class="flex flex-col items-center text-[#5c5bf2] floating" id="chatBtn" type="button">
        <i class="fas fa-comment-alt"></i>
        <span class="mt-1 font-semibold">Chat</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="alertsBtn" type="button">
        <i class="fas fa-bell"></i>
        <span class="mt-1">Alerts</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="profileBtn" type="button">
        <i class="fas fa-user"></i>
        <span class="mt-1">Profile</span>
      </button>
    </nav>
    
    <!-- Floating pink plus button -->
    <button aria-label="Add new message" class="btn-shadow absolute bottom-20 right-7 bg-[#f43f5e] w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl font-extrabold floating" id="addBtn" type="button">
      +
    </button>
  </div>

  <script src="js/firebase.config.js"></script>
  <script src="js/index.js"></script>
</body>
</html>
```

### 3. chat.html (Message Detail)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <title>Chat</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link href="css/common.css" rel="stylesheet"/>
  <link href="css/chat.css" rel="stylesheet"/>
</head>
<body class="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb]">
  <div class="phone-shadow bg-white rounded-[40px] w-[320px] h-[640px] flex flex-col p-5 relative">
    <div class="flex items-center gap-4 text-[#4b4b4b] mb-5">
      <button class="text-lg" id="backBtn" type="button">
        <i class="fas fa-arrow-left"></i>
      </button>
      <h2 class="text-[15px] font-semibold select-none" id="chatTitle">Message Detail</h2>
    </div>
    
    <div class="flex justify-center mb-5">
      <div class="bg-[#e5e7eb] text-[11px] font-semibold text-[#4b4b4b] rounded-full px-4 py-1 select-none">
        Today
      </div>
    </div>
    
    <div class="flex flex-col gap-4 overflow-y-auto max-h-[450px] pr-1 mb-4" id="chatMessages">
      <!-- Messages will be loaded here by JavaScript -->
    </div>
    
    <!-- Message input -->
    <div class="mt-auto flex items-center gap-2 bg-[#f9fafb] rounded-full px-4 py-2">
      <button class="text-[#a3a3a3] text-lg">
        <i class="fas fa-smile"></i>
      </button>
      <input class="flex-1 bg-transparent text-[13px] outline-none placeholder-[#a3a3a3]" placeholder="Type a message..." type="text" id="messageInput"/>
      <button class="text-[#a3a3a3] text-lg">
        <i class="fas fa-paperclip"></i>
      </button>
      <button class="bg-[#5c5bf2] text-white w-8 h-8 rounded-full flex items-center justify-center" id="sendBtn">
        <i class="fas fa-paper-plane text-sm"></i>
      </button>
    </div>
    
    <!-- Bottom nav -->
    <nav class="flex justify-between items-center mt-5 pt-5 border-t border-[#e5e7eb] text-[#a3a3a3] text-[14px]">
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="homeBtn" type="button">
        <i class="fas fa-home"></i>
        <span class="mt-1">Home</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="tvBtn" type="button">
        <i class="fas fa-tv"></i>
        <span class="mt-1">TV</span>
      </button>
      <button class="flex flex-col items-center text-[#5c5bf2] floating" id="chatBtn" type="button">
        <i class="fas fa-comment-alt"></i>
        <span class="mt-1 font-semibold">Chat</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="alertsBtn" type="button">
        <i class="fas fa-bell"></i>
        <span class="mt-1">Alerts</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="profileBtn" type="button">
        <i class="fas fa-user"></i>
        <span class="mt-1">Profile</span>
      </button>
    </nav>
    
    <!-- Floating pink plus button -->
    <button aria-label="Add new message" class="btn-shadow absolute bottom-20 right-7 bg-[#f43f5e] w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl font-extrabold floating" id="addBtn" type="button">
      +
    </button>
  </div>

  <script src="js/firebase.config.js"></script>
  <script src="js/chat.js"></script>
</body>
</html>
```

### 4. fri.html (Online Friends)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <title>Friends</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
  <link href="css/common.css" rel="stylesheet"/>
  <link href="css/fri.css" rel="stylesheet"/>
</head>
<body class="min-h-screen flex items-center justify-center p-6 bg-[#f9fafb]">
  <div class="phone-shadow bg-white rounded-[40px] w-[320px] h-[640px] flex flex-col p-5 relative">
    <div class="relative bg-[#5c5bf2] rounded-[20px] h-[48px] flex items-center px-4">
      <input class="w-full bg-[#5c5bf2] placeholder-[#d1d1f9] text-white text-sm font-medium outline-none" placeholder="Search" type="text"/>
      <button class="ml-3 text-white text-lg">
        <i class="fas fa-camera"></i>
      </button>
    </div>
    
    <p class="text-[11px] font-semibold text-[#4b4b4b] mt-5 mb-3 select-none">Online Friends</p>
    
    <div class="flex gap-4 overflow-x-auto no-scrollbar mb-5" id="onlineFriends">
      <!-- Online friends will be loaded here by JavaScript -->
    </div>
    
    <div class="flex flex-col gap-4 overflow-y-auto max-h-[400px] pr-1" id="friendsList">
      <!-- Friends list will be loaded here by JavaScript -->
    </div>
    
    <nav class="flex justify-between items-center mt-auto pt-5 border-t border-[#e5e7eb] text-[#a3a3a3] text-[14px]">
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="homeBtn" type="button">
        <i class="fas fa-home"></i>
        <span class="mt-1">Home</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="tvBtn" type="button">
        <i class="fas fa-tv"></i>
        <span class="mt-1">TV</span>
      </button>
      <button class="flex flex-col items-center text-[#5c5bf2] floating" id="chatBtn" type="button">
        <i class="fas fa-comment-alt"></i>
        <span class="mt-1 font-semibold">Chat</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="alertsBtn" type="button">
        <i class="fas fa-bell"></i>
        <span class="mt-1">Alerts</span>
      </button>
      <button class="flex flex-col items-center text-[#a3a3a3] floating" id="profileBtn" type="button">
        <i class="fas fa-user"></i>
        <span class="mt-1">Profile</span>
      </button>
    </nav>
    
    <button aria-label="Add new message" class="btn-shadow absolute bottom-20 right-7 bg-[#f43f5e] w-12 h-12 rounded-full flex items-center justify-center text-white text-3xl font-extrabold floating" id="addBtn" type="button">
      +
    </button>
  </div>

  <script src="js/firebase.config.js"></script>
  <script src="js/fri.js"></script>
</body>
</html>
```

### 5. JavaScript Files

**js/index.js**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Navigation handlers
  document.getElementById('chatBtn').addEventListener('click', () => {
    window.location.href = 'chat.html';
  });
  
  document.getElementById('addBtn').addEventListener('click', () => {
    // Handle new message creation
    console.log('Add new message clicked');
  });
  
  // Load messages from Firebase
  loadMessages();
});

function loadMessages() {
  // Replace with your Firebase collection reference
  db.collection("messages").orderBy("timestamp", "desc").limit(10).get()
    .then((querySnapshot) => {
      const messagesList = document.getElementById('messagesList');
      messagesList.innerHTML = '';
      
      querySnapshot.forEach((doc) => {
        const message = doc.data();
        const messageElement = createMessageElement(message);
        messagesList.appendChild(messageElement);
      });
    })
    .catch((error) => {
      console.log("Error getting messages: ", error);
    });
}

function createMessageElement(message) {
  // Create and return message element
  // Similar to the HTML structure in the original code
}
```

**js/chat.js**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Back button handler
  document.getElementById('backBtn').addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  // Send message handler
  document.getElementById('sendBtn').addEventListener('click', sendMessage);
  document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
  
  // Load chat messages
  loadChatMessages();
});

function loadChatMessages() {
  // Load messages for the current chat
}

function sendMessage() {
  // Send new message to Firebase
}
```

**js/fri.js**
```javascript
document.addEventListener('DOMContentLoaded', function() {
  // Navigation handlers
  document.getElementById('chatBtn').addEventListener('click', () => {
    window.location.href = 'chat.html';
  });
  
  // Load friends list
  loadOnlineFriends();
  loadFriendsList();
});

function loadOnlineFriends() {
  // Load online friends from Firebase
}

function loadFriendsList() {
  // Load full friends list from Firebase
}
```

### 6. CSS Files

**css/index.css**
```css
/* Additional styles specific to index.html */
#messagesList {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

#messagesList::-webkit-scrollbar {
  width: 4px;
}

#messagesList::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 2px;
}
```

**css/chat.css**
```css
/* Additional styles specific to chat.html */
#chatMessages {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

#chatMessages::-webkit-scrollbar {
  width: 4px;
}

#chatMessages::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 2px;
}

/* Message bubbles */
.bg-[#f3f4f6] {
  background-color: #f3f4f6;
}

.bg-[#5c5bf2] {
  background-color: #5c5bf2;
}
```

**css/fri.css**
```css
/* Additional styles specific to fri.html */
#onlineFriends {
  padding-bottom: 8px;
}

#friendsList {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

#friendsList::-webkit-scrollbar {
  width: 4px;
}

#friendsList::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 2px;
}
```

This structure provides:
1. Three separate HTML pages for different views
2. Shared Firebase configuration
3. Individual JavaScript files for each page's functionality
4. Shared common CSS with page-specific additions
5. Consistent navigation between pages
6. Ready-to-implement Firebase integration points

You'll need to:
1. Replace the Firebase config with your actual project details
2. Implement the Firebase data loading/saving functions
3. Add any additional page-specific functionality as needed
