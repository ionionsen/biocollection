var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const nodemailer = require('nodemailer');
var indexRouter = require('./routes/index');
var catalogRouter = require('./routes/catalog');
var usersRouter = require('./routes/users');
var applicationRouter = require('./routes/application');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/fonts', express.static('./node_modules/font-awesome/fonts'))
app.use('/icons', express.static('./node_modules/bootstrap-icons/icons'))
app.use('/', indexRouter);
app.use('/catalog', catalogRouter);
app.use('/application', applicationRouter);

// app.use('/users', usersRouter);
// app.use('/catalog/strain/:id', filtersRouter);

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

module.exports = app;
