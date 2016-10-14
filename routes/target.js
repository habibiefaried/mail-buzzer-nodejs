var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('target/index', {});
});

router.get('/add', function(req, res, next) {
  res.render('target/add', {});
});

router.post('/add', function(req, res, next) {
  res.render('target', {});
});

router.get('/delete/{id}', function(req, res, next) {
  res.render('target', {});
});

module.exports = router;