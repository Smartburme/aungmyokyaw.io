// app.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js';
import { firebaseConfig } from './firebase.config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

const provider = new GoogleAuthProvider();

const messagesEl = document.getElementById('messages');
const inputMessage = document.getElementById('inputMessage');
const sendBtn = document.getElementById('sendBtn');

let user = null;

// Firebase Auth login
async function login() {
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
    addMessage('system', `Logged in as ${user.displayName}`);
  } catch (error) {
    console.error('Login error:', error);
    addMessage('system', 'Login failed.');
  }
}

// Add message to chat
function addMessage(role, text) {
  const div = document.createElement('div');
  div.className = 'message ' + (role === 'user' ? 'user' : (role === 'ai' ? 'ai' : 'system'));
  div.textContent = text;
  messagesEl.appendChild(div);
  messagesEl.scrollTop = messagesEl.scrollHeight;

  // Save chat history in localStorage
  saveMessageToLocal(role, text);
}

function saveMessageToLocal(role, text) {
  let history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
  history.push({ role, content: text });
  localStorage.setItem('chatHistory', JSON.stringify(history));
}

// Send message handler
async function sendMessage() {
  const text = inputMessage.value.trim();
  if(!text) return;
  addMessage('user', text);
  inputMessage.value = '';
  inputMessage.disabled = true;
  sendBtn.disabled = true;

  try {
    const aiReply = await getAIResponse(text);
    addMessage('ai', aiReply);
  } catch (err) {
    addMessage('system', 'AI response error: ' + err.message);
  }

  inputMessage.disabled = false;
  sendBtn.disabled = false;
  inputMessage.focus();
}

// Call OpenAI API to get AI response
async function getAIResponse(prompt) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`  // in real deployment, don't expose keys in frontend!
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }]
    })
  });
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data.choices[0].message.content;
}

sendBtn.addEventListener('click', sendMessage);
inputMessage.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendMessage();
});

// Optional: auto login on page load
onAuthStateChanged(auth, u => {
  user = u;
  if (user) {
    addMessage('system', `Welcome back, ${user.displayName}`);
  } else {
    login();
  }
});
