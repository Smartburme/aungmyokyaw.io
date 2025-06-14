// server/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

// Frontend UI ကို serve လုပ်တဲ့ code တွေ လုံးဝမပါဝင်ရပါ
// ဥပမာ: app.use(express.static('public'));
// ဥပမာ: app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'build', 'index.html')));

app.get('/', (req, res) => {
  res.send('Smart Burme AI Backend Server is up and running!');
});

app.post('/api/chat', async (req, res) => {
  // ... OpenAI API call and message handling ...
});

app.get('/api/users/:userId', (req, res) => {
  // ... Dummy user profile ...
});

app.listen(port, () => {
  console.log(`\n======================================================`);
  console.log(` Smart Burme AI Backend Server is running!`);
  console.log(` Server URL: http://localhost:${port}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`======================================================\n`);
});
