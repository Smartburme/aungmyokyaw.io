// server/server.js

// Step 1: Load environment variables from .env file
require('dotenv').config();

// Step 2: Import necessary modules
const express = require('express'); // Express.js framework for building APIs
const cors = require('cors');     // CORS middleware for cross-origin requests
const { OpenAI } = require('openai'); // OpenAI SDK for AI integration

// Step 3: Initialize Express App
const app = express();
const port = process.env.PORT || 5000; // Use port from .env or default to 5000

// Step 4: Configure OpenAI Client (using API Key from .env)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Step 5: Configure Middleware
// Enable CORS for all origins during development.
// In production, you should restrict this to your frontend's domain.
app.use(cors());

// Enable express.json() to parse JSON request bodies
app.use(express.json());

// Step 6: Define API Endpoints

// Root endpoint (optional, just for basic server check)
app.get('/', (req, res) => {
  res.send('Smart Burme AI Backend is running!');
});

// 1. Chat Endpoint: Handles messages from the frontend and interacts with AI
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; // Get user message from request body
  const userId = req.body.userId || 'guest'; // Optional: Get user ID

  if (!userMessage) {
    return res.status(400).json({ success: false, message: "Message is required in the request body." });
  }

  console.log(`[${new Date().toLocaleString()}] Received message from user ${userId}: "${userMessage}"`);

  try {
    // OpenAI API call
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant for Burmese speakers." }, // System message
        { role: "user", content: userMessage }
      ],
      model: "gpt-3.5-turbo", // You can try "gpt-4o" or "gpt-4" if you have access and budget
      temperature: 0.7, // Creativity level (0.0 - 1.0, higher is more creative)
      max_tokens: 200,   // Maximum number of tokens (words) in the response
    });

    const aiResponse = completion.choices[0].message.content;

    console.log(`[${new Date().toLocaleString()}] AI responded: "${aiResponse}"`);
    res.json({ success: true, message: aiResponse });

  } catch (error) {
    // Error handling for OpenAI API calls
    console.error(`[${new Date().toLocaleString()}] Error communicating with OpenAI:`, error.response?.data || error.message);

    let errorMessage = "AI အဖြေပေးရာတွင် ပြဿနာတက်ပါသည်။ ကျေးဇူးပြု၍ API Key ကို ပြန်စစ်ဆေးပါ သို့မဟုတ် နောက်မှ ထပ်ကြိုးစားပါ။";
    if (error.response && error.response.status === 401) {
      errorMessage = "Invalid API Key. Please check your OpenAI API Key in the server's .env file.";
    } else if (error.response && error.response.status === 429) {
      errorMessage = "API Rate Limit Exceeded. Too many requests. Please try again later.";
    }

    res.status(500).json({ success: false, message: errorMessage });
  }
});

// 2. User Profile Endpoint (Example: for fetching user data from a dummy source or database)
app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[${new Date().toLocaleString()}] Fetching profile for user: ${userId}`);
  // In a real app, you would fetch this from a database
  const dummyUserProfile = {
    id: userId,
    name: "အသုံးပြုသူအမည်",
    email: `user_${userId}@example.com`,
    role: "premium",
    lastLogin: new Date().toISOString()
  };
  res.json(dummyUserProfile);
});

// Step 7: Start the Server
app.listen(port, () => {
  console.log(`Smart Burme AI Backend Server is running on http://localhost:${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
