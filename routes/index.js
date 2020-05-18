const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


// Welcome
router.get('/', forwardAuthenticated, function(req, res) {
  res.render('welcome', { title: 'Welcome' });
});

// Dashboard
router.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.redirect('/catalog');
});


module.exports = router;
