const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const pagesRouter = require('./routes/pages');
const apiRouter = require('./routes/api');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.use(expressLayouts);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/', pagesRouter);
app.use('/api', apiRouter);

// Basic error handler to avoid unhandled rejections from reaching the user
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Something went wrong. Please try again.');
});

module.exports = app;
