var express = require('express');
var router = express.Router();
const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

console.log("Attempting routing");

/* GET mirror page. */
router.get('/mirror', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // This thing is on crack wtf is pug bro
  console.log('GET /mirror route hit');
  res.sendFile(path.join(__dirname, '..', 'public', 'mirror.html'));
});

router.post('/draw', (req, res) => {
    console.log('POST /draw hit!');
  
    const { lines, width, height } = req.body; // Expecting lines array and canvas size
  
    if (!lines || !Array.isArray(lines)) {
      return res.status(400).json({ message: 'Invalid data: lines array is required' });
    }
  
    // Create a new canvas on the server using the data
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
  
    // Set line properties
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'red';
  
    // Draw the lines from the data received
    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line[0].x, line[0].y);
      line.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  
    // Save the canvas as a PNG file
    const outputPath = path.join(__dirname, '..', 'public', 'images', 'drawings', 'drawing.png');
    const out = fs.createWriteStream(outputPath);
    const stream = canvas.createPNGStream();
    stream.pipe(out);
  
    out.on('finish', () => {
      console.log('Image saved to ' + outputPath);
      res.json({ message: 'Image saved successfully', filePath: '/drawings/drawing.png' });
    });
  
    out.on('error', (err) => {
      console.error('Error saving image: ', err);
      res.status(500).json({ message: 'Error saving image', error: err });
    });
});
console.log("routing complete");
module.exports = router;