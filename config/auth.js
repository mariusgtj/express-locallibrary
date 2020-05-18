// The module ensure authenticated (if this module is missing, we can go, for example, freely to:  /dashboard )
// Is provided by the Passport
// We need to add "ensureAuthenticated" to all routes we want protected
// We also need to add "forwardAuthenticated" to all routes we want protected

// !!!-Interesting is the syntax for the following module.exports, where 2 modules are exported:

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // This is used when we need to go to the dashboard page (that means: user is authenticated).
    if (req.isAuthenticated()) { // if IS auth -> GO AHEAD to the next function and skip this code! 
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/users/login');
  },
  forwardAuthenticated: function(req, res, next) {
    // This is used when we need to go to the index page.
        // if IS NOT auth -> go and authenticate user -> execute next(), wich is authentication!
        // if IS auth -> it has access to the resource ->redirect to /dashboard!
    if (!req.isAuthenticated()) {  
      return next();
    }
    res.redirect('/dashboard');      
  }
};
