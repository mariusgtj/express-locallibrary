/// !!!! Here is the logic for Register-Get, Register-Post, Login-Get, Login-Post !!!!

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport') // Passport is declared in /config/passport.js

// User model
const User = require('../models/User')


// Register Get
router.get('/register', (req, res) => res.render('register'))


// Register Post
router.post('/register', (req, res) => {
    // GOOD PRACTICE:
    // Testing to see if what we pass in the form is actually the req.body
    // console.log(req.body)
    // res.send('hello')

    // Now will put each thing into a variable, using Destructuring
    const { name, email, password, password2 } = req.body
        // Note: We will do our validation before submit
    
    // Initialize error array
    let errors = []

    // Check required fields
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please enter all fields' });
    }

    // Check password match
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }
        
    // Check password length
    if (password.length < 6) {
        errors.push({ msg: 'Password must be at least 6 characters' });
    }

    // If any of checks before are true, then we want to re-render the registration form, with some stuff in
    // and in order to let the user know what is going on, we create Partials for messages (separate folder in Views)
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
      // Validation passed
      // First check to see that User doesnt exists, using findOne() ==> mongoose method
      User.findOne({ email: email })
        .then(user => {
          if(user) {
            // User exists. We re-render the 'register', but with another error
            errors.push({ msg: 'Email is already registered' })
            res.render('register', {
              errors,
              name,
              email,
              password,
              password2
            });
          } else {
            // We need to create an User, but first need to encrypt the password
              // We will create a new instance because we do not use user.save()
            const newUser = new User({
              name,
              email,
              password
            })
              // console.log(newUser)
              // res.send('hello again')

            // Hash password
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                // Set password to hashed
                newUser.password = hash;
                // Save user
                newUser.save()
                  .then(user => {
                    req.flash('success_msg', 'You are now registered and can log in')
                    res.redirect('/users/login')
                  })
                  .catch(err => console.log(err));
              })
            })
          }
        })
    }
})


// Login Get
router.get('/login', (req, res) => res.render('login'))


// Login Post
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


// Logout
router.get('/logout', (req, res) => {
  req.logout(); // !!This method is provided by the Passpost middleware
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});


module.exports = router
