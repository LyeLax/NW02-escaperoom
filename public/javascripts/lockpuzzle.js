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
    message.textContent = 'Unlocked! The door opens.';
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
