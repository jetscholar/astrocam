const express = require('express')
const { exec } = require('child_process');
const fs = require('fs');
//const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index')
})

io.on('connection', (socket) => {
  console.log('A user connected')

  // Simulate sending images at a certain frame rate (e.g., 5 frames per second)
  const frameRate = 5 // Adjust this as needed
  const intervalMs = 1000 / frameRate

  function sendImage() {
    // Capture an image from your ESP32-CAM
    const imageBuffer = captureImage() // Implement this function to capture an image

    // Encode the image buffer as Base64 to send it as a string
    const base64Image = imageBuffer.toString('base64')

    // Send the image to the connected client
    socket.emit('image', base64Image)
  }

  // Set up the image streaming interval
  const imageStreamInterval = setInterval(sendImage, intervalMs)

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected')
    
    // Clear the image streaming interval when the user disconnects
    clearInterval(imageStreamInterval)
  })
})



function captureImage() {
  // Command to capture an image using fswebcam and save it to a file
  const cmd = 'fswebcam -r 640x480 --no-banner /path/to/image.jpg';

  // Execute the command to capture the image
  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error capturing image: ${error}`);
      return;
    }

    if (stderr) {
      console.error(`fswebcam error: ${stderr}`);
      return;
    }

    // Read the captured image file as a binary buffer
    fs.readFile('/path/to/image.jpg', (readError, data) => {
      if (readError) {
        console.error(`Error reading image file: ${readError}`);
        return;
      }

      // Send the binary image data as a buffer to the client
      // You may need to adapt this part based on your WebSocket implementation
      socket.emit('image', data);
    });
  });
}

// Call the captureImage function periodically to send images
setInterval(captureImage, 1000 / frameRate);


module.exports = router