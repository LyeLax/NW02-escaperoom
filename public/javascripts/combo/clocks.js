const code = [7,3,5,5];
// Player 1 gets idxs 1 and 3
const idxs_plr1 = [0, 2];
const idxs_plr2 = [1, 3];

// Clock configuration, hour, minute
/*const clock1Config = [0, 90*3];
const clock2Config = [90*2, 90];
const clock3Config = [90, 0];
const clock4Config = [90*3, 90*2];*/

const clock4Config = [45, (90*3) + 45];
const clock3Config = [(90*2)+45, 90+45];
const clock2Config = [90+45, 45];
const clock1Config = [(90*3) + 45, (90*2) + 45];

const configs = [clock1Config, clock2Config, clock3Config, clock4Config];


function setupClocks(){

    // This will work for now to differentiate between players
    const plr_id = parseInt(window.location.port) % 2;
    if (Number.isNaN(plr_id)) return;
    const currentPlr = (plr_id == 0) ? idxs_plr1 : idxs_plr2;
    // Players will each get 2 clocks, this is just a way of abstracting that.
    const clock1conf = configs[currentPlr[0]];
    const clock2conf = configs[currentPlr[1]];

    const clockHandHr = document.getElementsByClassName("hour");
    const clockHandMin = document.getElementsByClassName("minute");
    clockHandHr[0].style.transform = 'rotate('+clock1conf[0].toString()+'deg)';
    clockHandHr[1].style.transform = 'rotate('+clock2conf[0].toString()+'deg)';

    clockHandMin[0].style.transform = 'rotate('+clock1conf[1].toString()+'deg)';
    clockHandMin[1].style.transform = 'rotate('+clock2conf[1].toString()+'deg)';

    const clockNum1 = document.getElementById("clockNums1");
    const clockNum2 = document.getElementById("clockNums2");
    clockNum1.textContent = "I".repeat(currentPlr[0]+1);
    clockNum2.textContent = "I".repeat(currentPlr[1]+1);


}

// Start here

window.onload = function(){
    setupClocks();
}