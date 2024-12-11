var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// Added to allow us to send notification of puzzle completion to other player.
var cors = require('cors');

console.log("App started");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mirrorRouter = require('./routes/mirrorRouting');
var checkerRouter = require('./routes/comboCheckerRouting');

var app = express();

// express http engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mirror', mirrorRouter);
app.use('/checker', checkerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

console.log("App loaded");
module.exports = app;
