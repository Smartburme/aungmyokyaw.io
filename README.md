# Smart Burme AI App

This is a monorepo containing a React frontend (client) and a Node.js backend (server) for a Smart Burme AI application.

## Project Structure
```
smart-burme-ai-app/
├── client/ # React Frontend Application
├── server/ # Node.js Backend Application
├── .gitignore # Root-level Git ignore rules
└── README.md # This README file
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
