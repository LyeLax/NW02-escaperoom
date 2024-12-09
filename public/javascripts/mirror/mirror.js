const MAIN_MOUSE_BUTTON = 0;
let shouldDraw = false;
let lines = [];
const theCanvas = document.getElementById("mirrorWriting");
const theContext = theCanvas.getContext("2d");
const clearButton = document.getElementById("clearButton");
const sendImage = document.getElementById("imgSave");

function prepareContext() {
  console.log("preparing canvas");
  let dpr = window.devicePixelRatio || 1;
  let rect = theCanvas.getBoundingClientRect();
  theCanvas.width = rect.width * dpr;
  theCanvas.height = rect.height * dpr;
  theContext.scale(dpr, dpr);
}

function setLineProperties() {
  theContext.lineWidth = 4;
  theContext.lineJoin = "round";
  theContext.lineCap = "round";
  theContext.strokeStyle = "red";
}

theCanvas.addEventListener("mousedown", start);
theCanvas.addEventListener("mouseup", end);
theCanvas.addEventListener("mousemove", move, false);

clearButton.addEventListener("click", () => clearCanvas(theContext));
sendImage.addEventListener("click", () => sendDrawData());

function clearCanvas(context) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  lines = [];
}

function start(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = true;
    setLineProperties();

    theContext.beginPath();
    let elementRect = event.target.getBoundingClientRect();
    theContext.moveTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    lines.push([{ x: event.clientX - elementRect.left, y: event.clientY - elementRect.top }]);
  }
}

function end(event) {
  if (event.button === MAIN_MOUSE_BUTTON) {
    shouldDraw = false;
  }
}

function move(event) {
  if (shouldDraw) {
    let elementRect = event.target.getBoundingClientRect();
    theContext.lineTo(event.clientX - elementRect.left, event.clientY - elementRect.top);
    theContext.stroke();

    let lastLine = lines[lines.length - 1];
    lastLine.push({ x: event.clientX - elementRect.left, y: event.clientY - elementRect.top });
  }
}

function sendDrawData() {
  console.log('attempting post');
  fetch('/mirror/draw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      lines: lines,  // Sending lines array to the server
      width: theCanvas.width,
      height: theCanvas.height
    })
  })
  .then(response => {
    console.log('Server response status:', response.status);
    return response.json();})
  .then(data => {
    if (data.filePath) {
      const imageUrl = data.filePath;
          // Create an image element to display the saved image
      const img = new Image();
      img.src = imageUrl;
      document.body.appendChild(img);  // Append image to body (or any other container)
    }
  })
  .catch(error => console.error('Error:', error));
}
prepareContext();