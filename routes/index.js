var express = require('express');
var router = express.Router();

// Welcome
router.get('/', function(req, res) {
  res.render('welcome', { title: 'Welcome' });
});

// Dashboard
router.get('/dashboard', function(req, res) {
  // res.render('index', { title: 'Index Home' });
  res.redirect('/catalog');
});

// ****************** Older *************************
/* FIRST - GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express SSS' });
// });

// SECOND - GET home page.
// router.get('/', function(req, res) {
//   res.redirect('/catalog');
// });

module.exports = router;
