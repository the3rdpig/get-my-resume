const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Bring in Model
let User = require('../models/user');

// Register Form
router.get('/register', function(req, res){
  res.render('register');
});

router.post('/register', function(req, res){
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const phone = req.body.phone;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email format is invalid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Name is required').notEmpty();
  req.checkBody('password2', 'Name is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('city', 'City is required').notEmpty();
  req.checkBody('state', 'State is required').notEmpty();
  req.checkBody('zip', 'Zip Code is required').notEmpty();
  req.checkBody('phone', 'Phone Number is required').notEmpty();

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name:name,
      email:email,
      username:username,
      password:password,
      address:address,
      city:city,
      state:state,
      zip:zip,
      phone:phone
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(error, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err) {
            console.log(err);
            return
          } else{
            req.flash('success', 'You are now registered and can log in.');
            res.redirect('/users/login');
          }
        });
      });
    });
  }
});

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', function(req, res, next){
  passport.authenticate('local',{
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
  })(req, res, next);
});

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are now logged out.')
  res.redirect('/users/login')
});

module.exports = router;
