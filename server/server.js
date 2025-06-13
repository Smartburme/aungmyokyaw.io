// server/server.js

// Node.js Application အတွက် လိုအပ်သော Modules များကို တင်သွင်းခြင်း
// ================================================================

// 1. dotenv: .env ဖိုင်မှ Environment Variables များကို load လုပ်ရန်
//    ၎င်းကို ဖိုင်၏ထိပ်ဆုံးတွင် အရင်ဆုံးခေါ်ဆိုခြင်းဖြင့် အခြား code များ မ run မီ environment variables များ ရရှိစေသည်။
require('dotenv').config();

// 2. express: Node.js အတွက် Web Application Framework
//    API endpoints များကို ဖန်တီးရန်နှင့် HTTP request များကို ကိုင်တွယ်ရန် အသုံးပြုသည်။
const express = require('express');

// 3. cors: Cross-Origin Resource Sharing (CORS) ကို ကိုင်တွယ်ရန် Middleware
//    Frontend (ဥပမာ: http://localhost:3000) မှ Backend (ဥပမာ: http://localhost:5000) သို့ API request များ ပို့ရာတွင်
//    Browser ၏ Security Mechanism ကြောင့် တားဆီးခြင်းမရှိစေရန် ခွင့်ပြုသည်။
const cors = require('cors');

// 4. openai: OpenAI API ကို Node.js မှတစ်ဆင့် ခေါ်ဆိုအသုံးပြုရန် SDK (Software Development Kit)
//    ChatGPT (GPT models) ကဲ့သို့သော AI Models များနှင့် ဆက်သွယ်ရန် အသုံးပြုသည်။
const { OpenAI } = require('openai'); // v4.x.x အတွက်

// Express Application ကို စတင်ခြင်းနှင့် Configuration
// ===================================================

const app = express(); // Express Application Object ကို ဖန်တီးခြင်း

// Server ကို run မည့် Port ကို သတ်မှတ်ခြင်း
// - process.env.PORT: .env ဖိုင်ထဲတွင် PORT ကို သတ်မှတ်ထားပါက ထိုတန်ဖိုးကို ယူသုံးမည်။
// - || 5000: .env တွင် PORT မသတ်မှတ်ထားပါက Default အားဖြင့် Port 5000 ကို အသုံးပြုမည်။
const port = process.env.PORT || 5000;

// OpenAI API Client ကို စတင်ခြင်း
// - apiKey: .env ဖိုင်ထဲက OPENAI_API_KEY ကို ယူသုံးသည်။ ၎င်းသည် သင်၏ လျှို့ဝှက် API Key ဖြစ်သည်။
// - ၎င်းမရှိပါက OpenAI API ကို ခေါ်ဆို၍ ရမည်မဟုတ်ပါ။
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Middleware များကို ထည့်သွင်းခြင်း
// =============================

// CORS Middleware: Incoming request အားလုံးအတွက် CORS ကို ခွင့်ပြုရန်
// Development အတွက် အဆင်ပြေသော်လည်း Production တွင် Security အတွက် သတ်မှတ်ထားသော Origin များကိုသာ ခွင့်ပြုသင့်သည်။
// ဥပမာ: app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cors());

// Body Parser Middleware: Incoming request ၏ JSON body များကို parse လုပ်ရန်
// Frontend မှ JSON format ဖြင့် ပို့လာသော data များကို req.body မှတစ်ဆင့် ရယူနိုင်စေသည်။
app.use(express.json());

// API Endpoints များကို သတ်မှတ်ခြင်း (Routes)
// =========================================

// 1. Root Endpoint (GET /)
//    Backend Server အလုပ်လုပ်မလုပ် စစ်ဆေးရန် အသုံးပြုနိုင်သော အခြေခံ Endpoint။
app.get('/', (req, res) => {
  res.send('Smart Burme AI Backend Server is up and running!');
});

// 2. Chat Endpoint (POST /api/chat)
//    Frontend မှ User Message များကို လက်ခံပြီး AI သို့ ပေးပို့ကာ AI ၏ အဖြေကို ပြန်ပို့ပေးသည်။
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message; // Request Body မှ user ရဲ့ message ကို ရယူခြင်း
  const userId = req.body.userId || 'guest'; // Optional: User ID ကို ရယူခြင်း (authentication ပါရင် လိုအပ်)

  // Message ပါဝင်မှုရှိမရှိ စစ်ဆေးခြင်း
  if (!userMessage || typeof userMessage !== 'string' || userMessage.trim().length === 0) {
    return res.status(400).json({ success: false, message: "Invalid or empty message provided." });
  }

  // Console တွင် Log ပြုလုပ်ခြင်း (Backend မှာ message ဘယ်လိုဝင်လာလဲ သိရအောင်)
  console.log(`[${new Date().toLocaleString()}] Received message from user ${userId}: "${userMessage}"`);

  try {
    // OpenAI API ကို ခေါ်ဆိုခြင်း
    const completion = await openai.chat.completions.create({
      messages: [
        // AI ရဲ့ အပြုအမူကို သတ်မှတ်တဲ့ System Message
        { role: "system", content: "You are a helpful and friendly AI assistant for Burmese speakers. Your responses should be clear, concise, and in Burmese when appropriate." },
        // User ရဲ့ လက်ရှိ မေးခွန်း
        { role: "user", content: userMessage }
        // (Optional: Chat history ကို ထည့်သွင်းခြင်းဖြင့် AI က အရင်ပြောခဲ့တာတွေကို မှတ်မိနိုင်)
        // ဥပမာ: ...existingChatMessages.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'assistant', content: msg.text }))...
      ],
      model: "gpt-3.5-turbo", // အသုံးပြုမည့် AI Model (e.g., gpt-4o, gpt-4, gpt-3.5-turbo)
      temperature: 0.7, // AI ရဲ့ creativity level (0.0 to 1.0, 0.7 က Default ကောင်း)
      max_tokens: 200,   // AI အဖြေ၏ အများဆုံး စာလုံးရေ (token)
      // stream: true, // Real-time response အတွက် သုံးနိုင် (Frontend ကလည်း stream ကို ကိုင်တွယ်နိုင်ရမည်)
    });

    const aiResponse = completion.choices[0].message.content; // AI ရဲ့ အဖြေကို ထုတ်ယူခြင်း

    // Console တွင် Log ပြုလုပ်ခြင်း (AI ဘာပြန်ဖြေလဲ သိရအောင်)
    console.log(`[${new Date().toLocaleString()}] AI responded: "${aiResponse}"`);

    // AI ၏ အဖြေကို Frontend သို့ JSON Format ဖြင့် ပြန်ပို့ခြင်း
    res.json({ success: true, message: aiResponse });

  } catch (error) {
    // API Call ပြုလုပ်စဉ် ဖြစ်ပေါ်လာသော Errors များကို ကိုင်တွယ်ခြင်း
    console.error(`[${new Date().toLocaleString()}] Error communicating with OpenAI:`, error.response?.data || error.message);

    let errorMessageForUser = "AI အဖြေပေးရာတွင် ပြဿနာတက်ပါသည်။ ကျေးဇူးပြု၍ နောက်မှ ထပ်ကြိုးစားပါ။";

    if (error.response) {
      // HTTP status codes အလိုက် Error Message ကို သတ်မှတ်ခြင်း
      if (error.response.status === 401) {
        errorMessageForUser = "သင်၏ OpenAI API Key မှားယွင်းနေပါသည်။ server/.env ဖိုင်ကို ပြန်စစ်ဆေးပါ။";
      } else if (error.response.status === 429) {
        errorMessageForUser = "API Rate Limit ကျော်လွန်နေပါသည်။ ခဏကြာပြီးမှ ထပ်ကြိုးစားပါ။";
      } else if (error.response.status === 400) {
          errorMessageForUser = "ပေးပို့သော Message မှာ ပြဿနာရှိပါသည်။";
      } else {
        errorMessageForUser = `AI ဝန်ဆောင်မှုမှ အမှားတစ်ခုခု (${error.response.status}) ပြန်လာပါသည်။`;
      }
    } else if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        errorMessageForUser = "AI ဝန်ဆောင်မှုနှင့် ချိတ်ဆက်၍ မရပါ။ သင်၏ network ကို စစ်ဆေးပါ။";
    }

    // Frontend သို့ Error Message ပြန်ပို့ခြင်း
    res.status(500).json({ success: false, message: errorMessageForUser });
  }
});

// 3. User Profile Endpoint (GET /api/users/:userId) (ဥပမာ)
//    User Profile data များကို Backend မှ ပြန်ပို့ပေးရန် (ယခု Dummy data သာ)။
//    အစစ်အမှန်တွင် Database မှ ဆွဲယူရမည်။
app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  console.log(`[${new Date().toLocaleString()}] Request for user profile: ${userId}`);

  // Dummy user profile data
  const dummyUserProfile = {
    id: userId,
    name: "အသုံးပြုသူအမည်",
    email: `user_${userId}@example.com`,
    role: "premium",
    status: "active",
    lastLogin: new Date().toISOString()
  };
  res.json(dummyUserProfile);
});

// Server ကို စတင် နားထောင်စေခြင်း
// ============================
app.listen(port, () => {
  // Server စတင် အလုပ်လုပ်ပါက Console တွင် message ပြသခြင်း
  console.log(`\n======================================================`);
  console.log(` Smart Burme AI Backend Server is running!`);
  console.log(` Server URL: http://localhost:${port}`);
  console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`======================================================\n`);
});
