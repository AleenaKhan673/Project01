// app.js
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');
let cors = require('cors')
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let incidentRouter = require('../routes/incident');
let app = express();

//create a user model instance
let UserModel = require('../model/user'); 
let User = UserModel.User; 

// getting-started.js 
let mongoose = require('mongoose');
let DB = require('./db');
// point mongoose to the DB URI
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;
mongoDB.on('error',console.error.bind(console,'Connection Error'));
mongoDB.once('open',()=>{
  console.log("Connected with the MongoDB")
});
mongoose.connect(DB.URI,{useNewURIParser:true,useUnifiedTopology:true});

//set-up session here
app.use(session({
  secret: "SomeSecret",
  saveUnintialized:false,
  resave:false
}))

// implement user authentication
passport.use(User.createStrategy());

//searlize and deserialize the user information 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//initialize the passport
app.use(passport.initialize());
app.use(passport.session()); 

//initialize the flash
app.use(flash());



// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');


//engine setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/incident', incidentRouter);
// /project --> projectrouter
// /contactus --> contactus

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
  res.render('error',{title:'Error'});
});

module.exports = app;