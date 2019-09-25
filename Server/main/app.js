var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser')
var app = express();
var indexRouter = require('./routes');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

module.exports = app;
