var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('queue', { title: 'Express' });
});

router.get('/queue', function(req, res, next) {
  res.render('queue', {});
});

router.get('/compose', function(req, res, next) {
  res.render('compose', {});
});

module.exports = router;
