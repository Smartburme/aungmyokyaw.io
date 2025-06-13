// ... (existing code) ...
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai'); // OpenAI SDK ကို တင်သွင်းပါ

const app = express();
const port = process.env.PORT || 5000;

// OpenAI Client ကို စတင်ပါ
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // .env က API Key ကို သုံးပါ
});

// Middleware
app.use(express.json());
app.use(cors());

// Example API Endpoint: Chat
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;
  const userId = req.body.userId; // Frontend က user id ပို့ရင် ယူသုံးနိုင်

  if (!userMessage) {
    return res.status(400).json({ success: false, message: "Message is required." });
  }

  console.log(`Received message from ${userId || 'guest'}: "${userMessage}"`);

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: userMessage }],
      model: "gpt-3.5-turbo", // သို့မဟုတ် gpt-4, gpt-4o စသည်
      temperature: 0.7, // AI ရဲ့ creativity
      max_tokens: 150, // အဖြေရဲ့ အရှည်
    });

    const aiResponse = completion.choices[0].message.content;
    res.json({ success: true, message: aiResponse });

  } catch (error) {
    console.error("Error communicating with OpenAI:", error.response?.data || error.message);
    res.status(500).json({ success: false, message: "AI အဖြေပေးရာတွင် ပြဿနာတက်ပါသည်။ ကျေးဇူးပြု၍ API Key ကို ပြန်စစ်ဆေးပါ သို့မဟုတ် နောက်မှ ထပ်ကြိုးစားပါ။" });
  }
});

// ... (other endpoints like /api/users/:userId) ...

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
