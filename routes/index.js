var express = require('express');
var router = express.Router();

/* FIRST - GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express SSS' });
// });

// SECOND - GET home page.
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

module.exports = router;
