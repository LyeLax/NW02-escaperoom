const code = [7,3,5,5];
// Player 1 gets idxs 1 and 3
const idxs_plr1 = [0, 2];
const idxs_plr2 = [0, 2];

// Clock configuration, hour, minute
const clock1Config = [0, 90*3];
const clock2Config = [90*2, 90];
const clock3Config = [90, 0];
const clock4Config = [90*3, 90*2];

const configs = [clock1Config, clock2Config, clock3Config, clock4Config];


function setupClocks(){

    const currentPlr = idxs_plr1;
    // Players will each get 2 clocks, this is just a way of abstracting that.
    const clock1conf = configs[currentPlr[0]];
    const clock2conf = configs[currentPlr[1]];

    const clockHandHr = document.getElementsByClassName("hour");
    const clockHandMin = document.getElementsByClassName("minute");
    clockHandHr[0].style.transform = 'rotate('+clock1conf[0].toString()+'deg)';
    clockHandHr[1].style.transform = 'rotate('+clock2conf[0].toString()+'deg)';

    clockHandMin[0].style.transform = 'rotate('+clock1conf[1].toString()+'deg)';
    clockHandMin[1].style.transform = 'rotate('+clock2conf[1].toString()+'deg)';

}

// Start here

window.onload = function(){
    setupClocks();
}