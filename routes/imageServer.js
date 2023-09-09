const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public')); // Serve your HTML and client-side scripts

// WebSocket connection handler
wss.on('connection', (socket) => {
  console.log('A user connected');

  // You can implement image streaming logic here
  // Whenever a new image is captured on ESP32-CAM, send it to connected clients
  // Use fs.readFile to read the image file and send it as binary data

  // Example:
  setInterval(() => {
    // Replace 'image.jpg' with the actual path of the captured image
    fs.readFile('path_to_captured_image.jpg', (err, data) => {
      if (err) {
        console.error('Error reading image:', err);
        return;
      }

      // Send the image as binary data to connected clients
      socket.send(data, { binary: true });
    });
  }, 1000 / frameRate);
});

server.listen(3000, () => {
  console.log('Node.js server is listening on port 3000');
});
