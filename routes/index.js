var express = require('express');
//var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  // This thing is on crack wtf is pug bro
  res.sendFile("public/index.html");
});

module.exports = router;
