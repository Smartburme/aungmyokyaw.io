// client/src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.css'; // Your main CSS is imported here.

const container = document.getElementById('root'); // Selects the div with id="root"
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App /> {/* Renders your App component into the "root" div */}
  </React.StrictMode>
);
