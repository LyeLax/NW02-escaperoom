var solution = ["up","left","down","up", "right", "up"];
var userInput = [];

function displayPoster(){
    document.getElementById("posterViewP2").className = "show";
    console.log(document.getElementById("posterView").className);
}

function hidePoster(){
    document.getElementById("posterViewP2").className = "hide";
}

function displayMap(){
    document.getElementById("mapView").className = "show";
    console.log(document.getElementById("posterView").className);
}

function hideMap(){
    document.getElementById("mapView").className = "hide";
}

function solutionChecker(){
    for (let i = 1; i < 7; i++){
        userInput.push(document.getElementById(`direction${i}`).value);
        console.log(userInput);  
    }
    if (JSON.stringify(solution)===JSON.stringify(userInput)){
        console.log("Puzzle Complete");
    }
    else{
        console.log("Puzzle Incorrect");
    }
}