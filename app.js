var express = require('express'),
  config = require('./server/configure'),
  app = express();

// view engine setup
app.set('views', __dirname + '/views');
app = config(app);

module.exports = app;
