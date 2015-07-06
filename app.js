var express = require('express'),
  config = require('./server/configure'),
  app = express(),
  mongoose = require('mongoose');

// view engine setup
app.set('views', __dirname + '/views');
app = config(app);

mongoose.connect('mongodb://localhost:27017/imgPloadr');
mongoose.connection.on('open', function(){
	console.log('Mongoose Connected.');
});

module.exports = app;
