var express = require('express');
var router = express.Router();
const fs = require('node:fs');

var puzzleCompleted = 0;


const fname = "public/comboComp.txt";

function loadPuzzleCompVal(){
  try{
    const cont = fs.readFileSync(fname, 'utf8');

    const num = Number.parseInt(cont);
    if (Number.isNaN(num)){
      console.log("Got NaN parsing value in combo completion: " + cont);
      return num;
    }

    return num;
  } catch(err){
    console.log("Error reading combo comp file: ", err);
    return "";
  }
}

function setPuzzleCompVal(val){

  if (val < 0 || val > 2) return;

  fs.writeFile(fname, val.toString(), err => {
    if (err)
      console.log("Got err writing in combo completion: " + err);
  });
}

console.log("Attempting routing - checker");
router.post("/setPuzzleCompleted", (req, res) => {
    // Basically, need to set if one player has completed the puzzle, from there we can respond with a seperate endpoint
    const val = req.body.val;
    console.log("Body: " + val);
    const completed = Number.parseInt(val);
    if (Number.isNaN(completed)) {
      res.send("What?");
      return;
    }

    setPuzzleCompVal(completed % 3);
    puzzleCompleted = completed % 3;

    console.log("Puzzle completed val: " + puzzleCompleted);
    res.send("Dun");
});

router.get("/getPuzzleCompleted", (req, res) => {
    // Send if the puzzle is completed.
    res.set({
      'Content-Type': 'text/plain',
      'Content-Length': '1',
      // extra headers here
    });

    const val = loadPuzzleCompVal();
    res.send(val.toString());
});

console.log("Attempting routing - checker, complete");
module.exports = router;