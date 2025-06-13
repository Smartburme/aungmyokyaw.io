const express = require('express');
const app = express();
require('dotenv').config(); // .env ဖိုင်များအတွက်

// Middleware များ
app.use(express.static(__dirname)); // Static files
app.use(express.json()); // JSON data များအတွက်

// အခြေခံ Route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Server Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
