
This is a monorepo containing a React frontend (client) and a Node.js backend (server) for a Smart Burme AI application.

## Project Structure
```
smart-burme-ai/
├── client/                     # (1) React Frontend Application (သင့်ရဲ့ smart-burme-ai app အဟောင်း)
│   ├── public/                 #   React development server (webpack) က Serve လုပ်မယ့် static files
│   │   ├── index.html          #     သင့်ရဲ့ React App ကို Render လုပ်မယ့် အဓိက HTML ဖိုင်
│   │   └── favicon.ico         #     Browser tab icon
│   ├── src/                    #   React Source Code တွေ ရှိတဲ့ နေရာ
│   │   ├── assets/             #     Static assets (images, fonts, etc.)
│   │   │   ├── images/
│   │   │   └── fonts/
│   │   ├── components/         #     ပြန်လည်အသုံးပြုနိုင်တဲ့ React Components များ
│   │   │   ├── Chat/           #       Chat Interface Components
│   │   │   │   ├── ChatInput.jsx
│   │   │   │   ├── ChatMessages.jsx
│   │   │   │   └── index.js
│   │   │   ├── Layout/         #       Page Layout Components (Header, Sidebar)
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── index.js
│   │   │   ├── Settings/       #       User Settings Components
│   │   │   │   ├── ApiKeyModal.jsx
│   │   │   │   ├── UserProfile.jsx
│   │   │   │   └── index.js
│   │   │   └── UI/             #       General UI Components (Button, Modal)
│   │   │       ├── Button.jsx
│   │   │       ├── Modal.jsx
│   │   │       └── index.js
│   │   ├── styles/             #     Global CSS Styles
│   │   │   ├── main.css
│   │   │   ├── chat.css
│   │   │   └── variables.css
│   │   ├── utils/              #     Utility Functions (API, Storage, Voice)
│   │   │   ├── api.js
│   │   │   ├── storage.js
│   │   │   └── voiceUtils.js
│   │   ├── contexts/           #     React Contexts (Global State Management)
│   │   │   ├── AuthContext.js
│   │   │   └── ChatContext.js
│   │   ├── hooks/              #     Custom React Hooks
│   │   │   ├── useApi.js
│   │   │   ├── useChat.js
│   │   │   └── useVoice.js
│   │   ├── firebase.config.js  #     Firebase Configuration (Optional)
│   │   ├── App.js              #     Main React Application Component
│   │   └── index.js            #     React Application ၏ JavaScript Entry Point
│   ├── node_modules/           #   `npm install` လုပ်ပြီးနောက် Frontend Dependencies များရှိရာ Folder
│   ├── package.json            #   Frontend Project ၏ Dependencies နှင့် Scripts များ (JSON Syntax မှန်ရမည်)
│   ├── package-lock.json       #   Frontend Dependencies များ၏ Lock File
│   └── .env                    #   Frontend အတွက် Environment Variables (e.g., REACT_APP_API_BASE_URL)
│
├── server/                     # (2) Node.js Backend Application (သင့်ရဲ့ website app အဟောင်း)
│   ├── server.js               #   Backend Server ၏ အဓိက Logic ဖိုင် (Express.js, API Integration)
│   ├── node_modules/           #   `npm install` လုပ်ပြီးနောက် Backend Dependencies များရှိရာ Folder
│   ├── package.json            #   Backend Project ၏ Dependencies နှင့် Scripts များ (JSON Syntax မှန်ရမည်)
│   ├── package-lock.json       #   Backend Dependencies များ၏ Lock File
│   └── .env                    #   Backend အတွက် Environment Variables (e.g., PORT, OPENAI_API_KEY)
│
├── .git/                       # (3) Git Version Control ၏ Internal Files
├── .gitignore                  # (4) Root Level Git Ignore Rules (node_modules, .env, build folders များကို ignore လုပ်ရန်)
└── README.md                   # (5) Overall Project ၏ Documentation
```
## Getting Started

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Smartburme/smart-burme-ai.git # သင်၏ Repo URL
    cd smart-burme-ai
    ```

2.  **Install Frontend dependencies:**
    ```bash
    cd client
    npm install
    cd ..
    ```

3.  **Install Backend dependencies:**
    ```bash
    cd server
    npm install
    cd ..
    ```

### Environment Variables

Each part (client and server) has its own `.env` file for configuration.

*   **For Frontend (`client/.env`):**
    ```
    REACT_APP_API_BASE_URL=http://localhost:5000/api
    ```
    *   Make sure the port matches your backend server's port.

*   **For Backend (`server/.env`):**
    ```
    PORT=5000
    OPENAI_API_KEY=your_openai_secret_key_here # Or other AI service API key
    ```

### Running the Application

You need to run the client and server simultaneously in separate terminal windows.

**Terminal 1 (Backend Server):**
```bash
cd server
node server.js # Or npm start if you configure it in server/package.json
