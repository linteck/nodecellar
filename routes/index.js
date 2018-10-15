var express = require('express');
var router = express.Router();
var wine = require('../routes/wines');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/wines');
  // res.render('index', { title: 'Express' });
});

module.exports = router;
