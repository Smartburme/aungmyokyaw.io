require('dotenv').config();
const openai_api_key = process.env.OPENAI_API_KEY;

// Firebase Upload Logic
async function uploadPhoto() {
  const file = document.getElementById("photoUpload").files[0];
  const storageRef = firebase.storage().ref('uploads/' + file.name);
  await storageRef.put(file);
  alert("Uploaded successfully!");
}

// Text to Image using OpenAI
async function generatePhoto() {
  const prompt = document.getElementById("prompt").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Generating...";

  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${openai_api_key}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "512x512"
    })
  });

  const data = await response.json();
  const imageUrl = data.data[0].url;
  resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image" style="width:100%"/>`;
}
