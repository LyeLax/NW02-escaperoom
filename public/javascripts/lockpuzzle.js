const HINT_INTERVAL = 180000; // 3 minutes
const TOTAL_HINTS = 3;

function initializeHintSystem() {

  let startTime = sessionStorage.getItem('hintStartTime');
  if (!startTime) {
    startTime = Date.now();
    sessionStorage.setItem('hintStartTime', startTime);
  }

  const elapsedTime = Date.now() - startTime;

  // Determine which hints should be available
  for (let i = 1; i <= TOTAL_HINTS; i++) {
    const hintTime = HINT_INTERVAL * i;
    if (elapsedTime >= hintTime) {
      showHintButton(i); // Show button 
    } else {
      setTimeout(() => showHintButton(i), hintTime - elapsedTime); // Schedule button to appear later
    }
  }
}

function showHintButton(hintNumber) {
  const buttonId = `hintButton${hintNumber}`;
  const textId = `hintText${hintNumber}`;
  const button = document.getElementById(buttonId);
  const text = document.getElementById(textId);

  button.style.display = 'inline'; // Show the button

  button.addEventListener('click', function () {
    text.style.display = 'block'; // Show the hint text
    button.style.display = 'none'; // Hide the button after clicked
  });
}

window.onload = initializeHintSystem;

const positions = [0, 40, 80, 120]; 
const correctPositions = { // Match chart
  pin1: 0,
  pin2: 80,
  pin3: 120,
  pin4: 40,
};
// Starting positions
const currentIndexes = {
  pin1: 0,
  pin2: 0,
  pin3: 0,
  pin4: 0,
};

function movePin(pinId) {

  currentIndexes[pinId] = (currentIndexes[pinId] + 1) % positions.length;
  const newPosition = positions[currentIndexes[pinId]];

  const pin = document.getElementById(pinId).querySelector('.clickable');
  pin.style.bottom = `${newPosition}px`;
}

function checkSolution() {
  let allCorrect = true;

  for (const pinId in correctPositions) {
    const currentIndex = currentIndexes[pinId];
    const currentPosition = positions[currentIndex];
    if (currentPosition !== correctPositions[pinId]) {
      allCorrect = false;
      break;
    }
  }

  const message = document.getElementById('message');
  if (allCorrect) {
    message.textContent = 'The door opens.';
    message.style.color = 'lime';
  } else {
    message.textContent = 'Pins are not in the correct position!';
    message.style.color = 'red';
  }
}

function navigateToChart() {
  window.location.href = 'chart.html';
}
function navigateToLock() {
  window.location.href = 'lockpuzzle.html';
}
