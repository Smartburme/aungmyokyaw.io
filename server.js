const express = require('express');
const app = express();

// Static Files (HTML/CSS/JS) များကို Serve လုပ်မည်
app.use(express.static(__dirname)); 

// Server Start လုပ်မည်
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
