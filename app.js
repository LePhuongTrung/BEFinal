var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require('./Database/connect');

var indexRouter = require('./routes/index');
var usersRouter = require('./features/user/routers/user');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//IIFE
(async () => {
    await database.connectDatabase();
})();
module.exports = app;
