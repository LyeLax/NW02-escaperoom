
const directions = {
    N: 0,
    E: 90,
    S: 180,
    W: 270,
};

function displayPoster(){
    document.getElementById("posterView").className = "show";
    console.log(document.getElementById("posterView").className);
}

function hidePoster(){
    document.getElementById("posterView").className = "hide";
}

function displayCompass(){
    document.getElementById("compassView").className = "show";

    setTimeout(() => pointTo('S'), 1000);    
    setTimeout(() => pointTo('E'), 2000); 
    setTimeout(() => pointTo('N'), 3000); 
    setTimeout(() => pointTo('S'), 4000);
    setTimeout(() => pointTo('W'), 5000);    
    setTimeout(() => pointTo('S'), 6000); 

}

function hideCompass(){
    document.getElementById("compassView").className = "hide";
}

function pointTo(direction){
    const arrow = document.getElementById("arrow");
    const angle = directions[direction];
    if (angle !== undefined){
        arrow.style.transform = `translate(-50%, -100%) rotate(${angle}deg)`;}
        else{
            console.error("direction incorrect: ", direction);
        }
}
