import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Import Router
import { AuthProvider } from './contexts/AuthContext';
import { ChatProvider } from './contexts/ChatContext';
import { Header, Sidebar } from './components/Layout';
import { ChatInput, ChatMessages } from './components/Chat';
import { ApiKeyModal, UserProfile } from './components/Settings';
import Button from './components/UI/Button';

// Separate Pages for clarity (these would be separate files)
const ChatPage = () => (
  <div className="chat-page-content"> {/* Add specific styles if needed */}
    <ChatMessages />
    <ChatInput />
  </div>
);

const SettingsPage = ({ setIsApiKeyModalOpen }) => (
  <div className="settings-page-content"> {/* Add specific styles if needed */}
    <UserProfile />
    <Button
      onClick={() => setIsApiKeyModalOpen(true)}
      variant="secondary"
      style={{ marginTop: 'var(--spacing-large)' }}
    >
      API Key ပြင်ဆင်ရန်
    </Button>
  </div>
);

function App() {
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  return (
    <Router> {/* Wrap the entire app with Router */}
      <AuthProvider>
        <ChatProvider>
          <div className="app-container">
            <Header />
            {/* Pass history/settings links directly to Sidebar */}
            <Sidebar /> {/* Sidebar doesn't need onNewChat/onGoToSettings props anymore */}
            <main className="main-content">
              <Routes>
                <Route path="/" element={<ChatPage />} />
                <Route path="/settings" element={<SettingsPage setIsApiKeyModalOpen={setIsApiKeyModalOpen} />} />
                <Route path="/history" element={<div><h2>Chat History Page</h2><p>Coming Soon!</p></div>} />
                {/* Add other routes as needed */}
                <Route path="*" element={<div><h2>404 Not Found</h2><p>The page you are looking for does not exist.</p></div>} />
              </Routes>
            </main>

            <ApiKeyModal
              isOpen={isApiKeyModalOpen}
              onClose={() => setIsApiKeyModalOpen(false)}
            />
          </div>
        </ChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
