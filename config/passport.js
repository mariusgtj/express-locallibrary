// Passport is used when handle LOGIN, to check if email exists
// Passport means that we need to configure LocalStrategy, remember: we installed passport-local !!!

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); // is used to Compare passwords

// Load User model
const User = require('../models/User');

// This is exactly from the docs!!!
// Interesting is the syntax for the following module.exports:
module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      // Match user ==== check if there is an user with that email
      User.findOne({ email: email })
      .then(user => {
        if (!user) {
          return done(null, false, { message: 'That email is not registered' });
        }

        // If there is an email, we need to deal with that...
        // Match password
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      })
      .catch(err => console.log(err));
    })
  );

  // This is exactly from the docs!!!
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // This is exactly from the docs!!!
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
