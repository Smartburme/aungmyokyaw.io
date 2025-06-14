// src/components/Layout/Sidebar.jsx (with react-router-dom Link)
import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate
import { useChatContext } from '../../contexts/ChatContext';
import Button from '../UI/Button';

function Sidebar() { // No more onNewChat, onGoToSettings props
  const { clearChat } = useChatContext();
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleNewChat = () => {
    clearChat();
    navigate('/'); // Navigate to home (chat) page
    console.log('New chat started, history cleared.');
  };

  return (
    <aside className="app-sidebar">
      <div className="sidebar-header">
        <h3>Menu</h3>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/" className="nav-item"> {/* Use Link */}
              <span>စကားပြောရန်</span>
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-item"> {/* Use Link */}
              <span>ပြင်ဆင်ရန်</span>
            </Link>
          </li>
          <li>
            <Link to="/history" className="nav-item"> {/* Use Link */}
              <span>မှတ်တမ်းများ</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <Button variant="primary" onClick={handleNewChat} fullWidth>
          စကားဝိုင်းအသစ်
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
