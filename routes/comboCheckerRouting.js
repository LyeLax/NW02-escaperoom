var express = require('express');
var router = express.Router();

var puzzleCompleted = 0;

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
    puzzleCompleted = completed % 2;
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
    res.send(puzzleCompleted.toString());
});

console.log("Attempting routing - checker, complete");
module.exports = router;