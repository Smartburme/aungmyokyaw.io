import { getAIResponse } from './api.js';

// DOM selections
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('.send-icon');
const chatDisplay = document.querySelector('.chat-display');
const initialMessage = document.querySelector('.initial-message');
const loadingContainer = document.getElementById('loadingContainer');

// Send message function
async function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        if (initialMessage) {
            initialMessage.style.display = 'none';
        }

        // Add user message
        addMessage(messageText, 'user');
        messageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Get response from OpenAI
            const aiResponse = await getAIResponse(messageText);
            removeTypingIndicator();
            addMessage(aiResponse, 'ai');
        } catch (error) {
            removeTypingIndicator();
            addMessage("တောင်းပန်ပါတယ်၊ အချက်အလက်များရယူရာတွင် အခက်အခဲတစ်ခုဖြစ်နေပါသည်။", 'ai');
            console.error('Error:', error);
        }
    }
}

// Add message to chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    messageDiv.textContent = text;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = 'AI စာရိုက်နေပါသည်<span class="typing-indicator"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>';
    chatDisplay.appendChild(typingDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Event listeners
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
