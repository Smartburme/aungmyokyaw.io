// api.js - This will handle all OpenAI API interactions

let API_KEY = '';

// Function to load the API key from Render.com environment
async function loadAPIKey() {
    try {
        // In production, this will use Render.com's environment variable
        if (process.env.OPENAI_API_KEY) {
            API_KEY = process.env.OPENAI_API_KEY;
            return;
        }
        
        // For local development, load from file (you should gitignore this file)
        const response = await fetch('api_key.txt');
        if (response.ok) {
            API_KEY = await response.text();
            API_KEY = API_KEY.trim();
        } else {
            throw new Error('Failed to load API key');
        }
    } catch (error) {
        console.error('Error loading API key:', error);
        throw error;
    }
}

// Function to get response from OpenAI
async function getAIResponse(prompt) {
    if (!API_KEY) {
        await loadAPIKey();
    }

    const loadingContainer = document.getElementById('loadingContainer');
    loadingContainer.style.display = 'flex';

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are Smart Burme AI, a helpful assistant that responds in Burmese language."
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return "တောင်းပန်ပါတယ်၊ အချက်အလက်များရယူရာတွင် အခက်အခဲတစ်ခုဖြစ်နေပါသည်။ ကျေးဇူးပြု၍ နောက်မှထပ်ကြိုးစားပေးပါ။";
    } finally {
        loadingContainer.style.display = 'none';
    }
}

// Export functions if using modules
export { getAIResponse, loadAPIKey };
