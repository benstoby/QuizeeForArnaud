var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var utilslogin = require('./utils/checklogin');

var indexRouter = require('./routes/index');
var quizzRouter = require('./routes/quizz');
var usersRouter = require('./routes/users');
var doquizzRouter = require('./routes/doquizz')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'QxHQ6QAUMODDcpru11v2HWB5ppitc5F4UIhi8D2dov8znAdwYb6jAisDCqhylB4iLrXyb2HGdVy3YE8JOqPFo1WdYKifRoO5LQJPT9ZwvPXfEttQqgfDGsjn3nyaFQJOqYtzbPftK2eNEFmo5YK5P9BkPxDJqvyovnwM2670yPqDjFRpKfGgXsiGCGbP659ZsV8BMVj5cRSSz6rboUecxXxaaiMxWfcSEUZk7PReqfG8PpMBnFWHFhB8F3QfviwUHyfy21cBSh8dMAbZEvJXM9erbdGNVDWXccwb2nBHOwkJ',
  
  saveUninitialized: false,
  resave: false
}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/quizz',utilslogin.checklogin ,quizzRouter);
app.use('/doquizz', doquizzRouter);

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  next(createError(404));
});*/

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
