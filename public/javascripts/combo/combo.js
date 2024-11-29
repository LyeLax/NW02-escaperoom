

function main(){
    setupHandlers();
}

// e: Event
function mirrorClickHandler(e){
    const mirror = e.target;
    mirror.style.visibility = "hidden";
}

function handleSuccess(){
    // Will obv redirect user to success screen in the end, dont worry.
    //window.alert("You solved the puzzle :)");
    window.location.replace("combo-hallway-finish.html");

}

const code = [7,3,5,5];
// Idea here: possibly have the server check against the code to verify if its correct, if we do it here the user can interfere since the js 
// is obv happening in their browser. Rlly depends if we wanna care about that stuff doe
let comboValues = [0,0,0,0];
function comboHandler(e){
    const combo = e.target;
    const comboIdx = (Number.parseInt(combo.id[5]) - 1) % comboValues.length;
    console.log("ID clicked: " + comboIdx);
    comboValues[comboIdx]++;
    comboValues[comboIdx] %= 10;
    combo.src = "images/combo/" + comboValues[comboIdx] + ".PNG";

    for (let i = 0; i < comboValues.length; i++){
        if (code[i] != comboValues[i]) return;
    }

    handleSuccess();

}

function setupHandlers(){
    //const mirror = document.getElementById("mirror");
    //mirror.addEventListener('click', mirrorClickHandler);
    //mirror.style.clickable

    // For the combination lock
    for (let i = 1; i < 5; i++){
        document.getElementById("combo" + i.toString()).addEventListener('click', comboHandler);
    }
}

// Start here

window.onload = function(){
    main();
}
