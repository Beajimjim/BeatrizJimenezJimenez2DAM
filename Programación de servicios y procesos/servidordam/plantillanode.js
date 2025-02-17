// server.js
const express = require('express');
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('<h1>Hola mundo desde Node y Express</h1>');
});

// Listen on port 80
app.listen(80, () => {
  console.log('Server running on http://localhost');
});