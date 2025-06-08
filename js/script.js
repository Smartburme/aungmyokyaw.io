// script.js (ES Module version)

import { rtdb } from './firebase-config.js';
import {
  ref,
  push,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ========== Tab Switching ==========
const tabs = [
  document.getElementById('chat-tab'),
  document.getElementById('image-tab'),
  document.getElementById('video-tab')
];
const navButtons = [
  document.getElementById('tab-chat-btn'),
  document.getElementById('tab-image-btn'),
  document.getElementById('tab-video-btn')
];

navButtons.forEach((btn, i) => {
  btn.addEventListener('click', () => {
    tabs.forEach(tab => tab.classList.remove('active'));
    tabs[i].classList.add('active');
  });
});

// ========== Chat ==========
const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');
const chatRef = ref(rtdb, 'chatMessages');

function appendMessage(text, isUser) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', isUser ? 'user-message' : 'ai-message');
  msgDiv.textContent = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

chatSendBtn.addEventListener('click', () => {
  const message = chatInput.value.trim();
  if (!message) return;

  push(chatRef, {
    sender: 'user',
    text: message,
    timestamp: Date.now()
  });

  fetch('https://us-central1-smartburme.cloudfunctions.net/getAIResponse', {
    method: 'POST',
    body: JSON.stringify({ prompt: message }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    push(chatRef, {
      sender: 'ai',
      text: data.reply,
      timestamp: Date.now()
    });
  });

  chatInput.value = '';
});

onChildAdded(chatRef, snapshot => {
  const data = snapshot.val();
  if (data) appendMessage(data.text, data.sender === 'user');
});

// ========== Image Generation ==========
const imageInput = document.getElementById('image-input');
const imageGenBtn = document.getElementById('image-gen-btn');
const imageResult = document.getElementById('image-result');
const imageGenRef = ref(rtdb, 'imageResults');

imageGenBtn.addEventListener('click', () => {
  const prompt = imageInput.value.trim();
  if (!prompt) return;

  fetch('https://us-central1-smartburme.cloudfunctions.net/generateImage', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    push(imageGenRef, {
      prompt,
      url: data.url,
      timestamp: Date.now()
    });
  });

  imageInput.value = '';
});

onChildAdded(imageGenRef, snapshot => {
  const data = snapshot.val();
  if (data?.url) {
    imageResult.innerHTML = '';
    const img = document.createElement('img');
    img.src = data.url;
    img.alt = data.prompt;
    imageResult.appendChild(img);
  }
});

// ========== Video Generation ==========
const videoInput = document.getElementById('video-input');
const videoGenBtn = document.getElementById('video-gen-btn');
const videoResult = document.getElementById('video-result');
const videoGenRef = ref(rtdb, 'videoResults');

videoGenBtn.addEventListener('click', () => {
  const prompt = videoInput.value.trim();
  if (!prompt) return;

  fetch('https://us-central1-smartburme.cloudfunctions.net/generateVideo', {
    method: 'POST',
    body: JSON.stringify({ prompt }),
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    push(videoGenRef, {
      prompt,
      url: data.url,
      timestamp: Date.now()
    });
  });

  videoInput.value = '';
});

onChildAdded(videoGenRef, snapshot => {
  const data = snapshot.val();
  if (data?.url) {
    videoResult.innerHTML = '';
    const vid = document.createElement('video');
    vid.src = data.url;
    vid.controls = true;
    videoResult.appendChild(vid);
  }
});
