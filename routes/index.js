var express = require('express');
var router = express.Router();
var wine = require('../routes/wines');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/wines', wine.findAll);
router.get('/wines/:id', wine.findById);
router.post('/wines', wine.addWine);
router.put('/wines/:id', wine.updateWine);
router.delete('/wines/:id', wine.deleteWine);

module.exports = router;
