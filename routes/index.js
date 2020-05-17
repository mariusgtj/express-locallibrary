const express = require('express');
const router = express.Router();


// Welcome
router.get('/', function(req, res) {
  res.render('welcome', { title: 'Welcome' });
});


// Dashboard
router.get('/dashboard', function(req, res) {
  // res.render('index', { title: 'Index Home' });
  res.redirect('/catalog');
});


module.exports = router;
