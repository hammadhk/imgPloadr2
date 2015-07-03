var path = require('path'),
  routes = require('./routes'),
  exphbs = require('express3-handlebars'),
  express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  errorHandler = require('errorhandler');
  // favicon = require('serve-favicon'),
  // logger = require('morgan'),;


module.exports = function(app) {
  app.engine('handlebars',  exphbs.create({
          defaultLayout:  'main',
          layoutsDir: app.get('views')  + '/layouts',
          partialsDir:  [app.get('views') + '/partials']
  }).engine);
  app.set('view engine',  'handlebars');

  // uncomment after placing your favicon in /public
  //app.use(favicon(__dirname + '/public/favicon.ico'));
  app.use(morgan('dev'));
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser({uploadDir:path.join(__dirname, '../public/upload/temp')}));
  app.use(methodOverride());
  app.use(cookieParser('some-secret-value-here'));
  //app.use(express.static(path.join(__dirname, 'public')));

  //app.use('/', routes);
  //app.use('/users', users);
  routes.initialize(app, new express.Router());
  app.use('/public/', express.static(path.join(__dirname, '../public')));

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get('env') === 'development') {
    // app.use(function(err, req, res, next) {
    //   res.status(err.status || 500);
    //   res.render('error', {
    //     message: err.message,
    //     error: err
    //   });
    // });
    app.use(errorHandler());
  }

  return app;
};