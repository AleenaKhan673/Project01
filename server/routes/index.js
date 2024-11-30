let UserModel = require('../model/user');
let User = UserModel.User;
var incidentModel = require('../model/incident');
var express = require('express');
var router = express.Router();
var passport = require('passport');
let DB = require('../config/db'); 

// Middleware to attach user info to all views
router.use((req, res, next) => {
    res.locals.displayName = req.user ? req.user.displayName : '';
    next();
  });

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    displayName:req.user ? req.user.displayName:'' });
}); 
/* GET home page. */
router.get('/home', function(req, res, next) {
  res.render('index', { 
    title: 'Home',
    displayName:req.user ? req.user.displayName:'' });
});
/* GET about us page. */
router.get('/aboutus', function(req, res, next) {
  res.render('index', { 
    title: 'About Us',
    displayName:req.user ? req.user.displayName:'' });
});
/* GET Product page. */
router.get('/products', function(req, res, next) {
  res.render('index', { 
    title: 'Product',
    displayName:req.user ? req.user.displayName:''
   });
});
/* GET Services page. */
router.get('/service', function(req, res, next) {
  res.render('index', { 
    title: 'Service',
    displayName:req.user ? req.user.displayName:'' });
});
/* GET contact me page. */
router.get('/contactus', function(req, res, next) {
  res.render('index', { 
    title: 'Contact us',
    displayName:req.user ? req.user.displayName:'' });
});


// get and post router of login.ejs
router.get('/login',function(req,res,next){
  if(!req.user)
  { 
    res.render('Auth/login',
      {
      title:'Login',
      message:req.flash('loginMessage'),
      displayName:req.user ? req.user.displayName:''
    })
  } else {
    return res.redirect('/')
  }
});
router.post('/login', passport.authenticate('local', {
    successRedirect: '/incident/add', 
    failureRedirect: '/login', 
    failureFlash: true 
  }));


// get and post router of register.ejs
router.get('/register',function(req,res,next){
  if(!req.user)
  {
    res.render('Auth/register',
      {
        title:'Register',
        message:req.flash('registerMessage'),
        displayName: req.user ? req.user.displayName:''
      }
    );
  }
  else
  {
    return res.redirect('/')
  }
});
router.post('/register',function(req,res,next){
  let newUser = new User({
    username: req.body.username,
    //password:req.body.password,
    email:req.body.email,
    displayName:req.body.displayName
  });
  User.register(newUser, req.body.password,(err)=>{
    if(err){
      console.log("Error:Inserting the new user");
      if(err.name=="UserExistsError") {
        req.flash('registerMessage', 'Registration Error: User already exists');
      }
      return res.render('Auth/register',
        {
          title:'Register',
          message:req.flash('registerMessage'),
          displayName: req.user ? req.user.displayName:''
        });
    }
    else{
      return passport.authenticate('local')(req,res,()=>{
        res.redirect('/incident')
      });
    }
  });
});

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err) 
    {
      return next(err)
    }
  });
  res.redirect('/')
});
module.exports = router;