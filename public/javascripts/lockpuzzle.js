// Timer durations for each hint (in milliseconds)
const HINT_INTERVAL = 180000; // 3 minutes
const TOTAL_HINTS = 3;

// Function to initialize the timer and hints
function initializeHintSystem() {
  // Get the stored start time, or set it to the current time
  let startTime = sessionStorage.getItem('hintStartTime');
  if (!startTime) {
    startTime = Date.now();
    sessionStorage.setItem('hintStartTime', startTime);
  }

  // Calculate elapsed time
  const elapsedTime = Date.now() - startTime;

  // Determine which hints should be available
  for (let i = 1; i <= TOTAL_HINTS; i++) {
    const hintTime = HINT_INTERVAL * i;
    if (elapsedTime >= hintTime) {
      showHintButton(i); // Show button if the time has passed
    } else {
      setTimeout(() => showHintButton(i), hintTime - elapsedTime); // Schedule button to appear later
    }
  }
}

// Function to show a hint button and handle its click event
function showHintButton(hintNumber) {
  const buttonId = `hintButton${hintNumber}`;
  const textId = `hintText${hintNumber}`;
  const button = document.getElementById(buttonId);
  const text = document.getElementById(textId);

  button.style.display = 'inline'; // Show the button

  // Add click event listener to the button
  button.addEventListener('click', function () {
    text.style.display = 'block'; // Show the hint text
    button.style.display = 'none'; // Hide the button after it's clicked
  });
}

// Initialize the hint system when the page loads
window.onload = initializeHintSystem;
// Predefined positions for the pins (all within the range of the box height)
const positions = [0, 40, 80, 120]; // Constrained to match the pin box height
const correctPositions = {
  pin1: 0,
  pin2: 80,
  pin3: 120,
  pin4: 40,
};

// Track the current position index for each pin
const currentIndexes = {
  pin1: 0,
  pin2: 0,
  pin3: 0,
  pin4: 0,
};

// Function to move pins
function movePin(pinId) {
  // Update the current index and calculate the new position
  currentIndexes[pinId] = (currentIndexes[pinId] + 1) % positions.length;
  const newPosition = positions[currentIndexes[pinId]];

  // Move the pin to the new position
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

// Function to navigate to the "Chart" page
function navigateToChart() {
  window.location.href = 'chart.html';
}
