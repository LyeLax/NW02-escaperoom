const correctSequence = ['diamond', 'hourglass', 'fish']; 
let selectedSequence = []; 

// Add click event to all objects
document.querySelectorAll('.jar').forEach(jar => {
    jar.addEventListener('click', () => {
        const symbol = jar.dataset.id; 

        if (selectedSequence.length < correctSequence.length) {
            selectedSequence.push(symbol); 
            jar.classList.add('highlight');
            jar.style.pointerEvents = 'none'; 
        }
    });
});

// Handle submission
document.getElementById('submit').addEventListener('click', () => {
    if (JSON.stringify(selectedSequence) === JSON.stringify(correctSequence)) {
        completePuzzle(); 
    } else {
        alert('Incorrect sequence. Try again!');
        resetPuzzle(false); 
    }
});

// puzzle completion
function completePuzzle() {
    // Display the modal
    document.getElementById('popupModal').style.display = 'flex';

    // Handle Exit Button
    document.getElementById('exitButton').addEventListener('click', () => {
        window.location.href = 'communication_puzzle.html'; // Replace with your homepage file/path
    });
}

// Function to reset the puzzle
function resetPuzzle(isCompleted) {
    if (isCompleted) {
        return;
    }

    // Reset for another attempt
    selectedSequence = []; 
    document.querySelectorAll('.jar').forEach(jar => {
        jar.classList.remove('highlight'); 
        jar.style.pointerEvents = 'auto'; 
    });
}
