// This module ensure authenticated (if not, for example, we can go freely to:  /dashboard )
// Is provided by the Passport
// We need to add "ensureAuthenticated" to all routes we want protected

// Interesting is the syntax for the following module.exports:

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { // if is NOT auth -> execute this! 
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) { // if IS auth -> execute this! 
      return next();
    }
    res.redirect('/dashboard');      
  }
};
