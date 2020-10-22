require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const mongoDB = require('./config/db');

// Require Routes
const usersRouter = require('./routes/userRoutes');
const projectsRouter = require('./routes/projectRoutes');
const issuesRouter = require('./routes/issueRoutes');
const { log } = require('debug');

const app = express();

//DB
mongoDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/users', usersRouter);
app.use('/projects', projectsRouter);
app.use('/issues', issuesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log('not found');
});

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
});

module.exports = app;
