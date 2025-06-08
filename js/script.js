// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCK8xFznYs4FFuH-JBmXhX69I9iIdFC-DY",
  authDomain: "smart-burme-ai.firebaseapp.com",
  projectId: "smart-burme-ai",
  storageBucket: "smart-burme-ai.appspot.com",
  messagingSenderId: "1057673784315",
  appId: "1:1057673784315:web:b7004e00ce88b7ecd3b95e",
  measurementId: "G-VDB178C50B"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const loading = document.getElementById('loading');

    // စတင်ချိန်မှာ AI ကနေ ကြိုဆိုစကား
    displayMessage("မင်္ဂလာပါ! SmartBurme AI မှ ကြိုဆိုပါတယ်။ ဘာတွေ ကူညီပေးရမလဲ?", 'ai');

    // စာပို့ခြင်းလုပ်ဆောင်ချက်
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // User message ကို ပြသခြင်း
        displayMessage(message, 'user');
        userInput.value = '';
        
        // Loading indicator ပြခြင်း
        loading.style.display = 'flex';
        
        // Firebase သို့ message သိမ်းဆည်းခြင်း
        saveMessageToFirebase(message, 'user');
        
        // AI ဖြေကြားချက်အတွက် API ကိုခေါ်ခြင်း
        getAIResponse(message)
            .then(aiResponse => {
                displayMessage(aiResponse, 'ai');
                saveMessageToFirebase(aiResponse, 'ai');
            })
            .catch(error => {
                displayMessage("တောင်းပန်ပါတယ်၊ အချက်အလက်ရယူရာတွင် အခက်အခဲတစ်ခုဖြစ်နေပါသည်။", 'ai');
                console.error("API Error:", error);
            })
            .finally(() => {
                loading.style.display = 'none';
            });
    }

    // Message ကို chat box တွင် ပြသခြင်း
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Firebase တွင် message သိမ်းဆည်းခြင်း
    function saveMessageToFirebase(message, sender) {
        const timestamp = new Date().getTime();
        database.ref('messages/' + timestamp).set({
            sender: sender,
            message: message,
            timestamp: timestamp
        });
    }

    // API မှ AI ဖြေကြားချက်ရယူခြင်း
    async function getAIResponse(question) {
        // ဒီနေရာမှာ သင့်ရဲ့ API endpoint ကိုအစားထိုးပါ
        const apiUrl = 'https://your-ai-api-endpoint.com/ask';
        
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: question,
                    language: 'myanmar'
                })
            });
            
            if (!response.ok) {
                throw new Error('API request failed');
            }
            
            const data = await response.json();
            return data.answer || "တောင်းပန်ပါတယ်၊ ကျွန်တော်ဒီမေးခွန်းကို နားမလည်သေးပါဘူး။";
        } catch (error) {
            console.error("API Error:", error);
            return "တောင်းပန်ပါတယ်၊ အချက်အလက်ရယူရာတွင် အခက်အခဲတစ်ခုဖြစ်နေပါသည်။";
        }
    }

    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // ယခင်စကားဝိုင်းများကို Firebase မှ ပြန်လည်ရယူခြင်း
    database.ref('messages').orderByChild('timestamp').limitToLast(10).on('value', (snapshot) => {
        const messages = snapshot.val();
        if (messages) {
            chatBox.innerHTML = '';
            Object.keys(messages).forEach(key => {
                const msg = messages[key];
                displayMessage(msg.message, msg.sender);
            });
        }
    });
});
