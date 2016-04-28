var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');

var db = mongoose.connect('mongodb://localhost:27017/nestbirds')

var app = express();


//Require the models here, and add them to each route's req object.
//Real program: only add to routes that you'll need this data.
var Bird = require('./models/bird');
var Nest = require('./models/nest');

//Create a models object with the Models we'll use
var models = {};
models['Bird'] = Bird;
models['Nest'] = Nest;

//And app.use to add the models object to each req object.
app.use(function(req, res, next){
  req.models = models
  next();   //remember to call next() or your app will hang!
})

// Typically don't do this! But let's create an example Nest and Bird.
var flamingoNest = Nest( { materials : 'Mud', location : 'By water'})

  flamingoNest.save(function(err, nest) {

    if (err) {  console.log(err); }

    else {
      console.log('saved Flamingo nest');
      console.log(nest);

      //Create a flamingo. Set the nest_data attribute to the nest._id
      //not the Nest document.
      var flamingo = Bird( { name:'Flamingo', eggs : 1, nest_data : nest._id })

      flamingo.save(function(err, fl) {
        if (err) {  console.log(err);  }
        else {
          console.log('Saved flamingo');
          console.log(fl);
          }
    });

  }


})





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
