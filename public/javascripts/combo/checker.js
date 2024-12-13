
function puzzleChecker(){
    fetch("/checker/getPuzzleCompleted", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/plain',
        },
    }).then(resp => {
        console.log("Resp: " + resp.status);
        return resp.text();
    }).then(data => {
        console.log("Data: " + data);
        if (data == "1") {
            window.alert("A player has completed the puzzle!");
            window.location.replace("combo-hallway-finish.html");
        }
        return data;
    }).catch(error => console.error('Error:', error));
}

function checker(){
    console.log("Checking...");
    puzzleChecker();
}
window.setInterval(checker, 2000);