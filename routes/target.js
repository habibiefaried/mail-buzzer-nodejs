var express = require('express');
var router = express.Router();
var targetModel = require('../model/target');

router.get('/', function(req, res, next) {
	res.render('target/index', {});
});

router.get('/add', function(req, res, next) {
	res.render('target/add', {});
});

router.post('/add', function(req, res, next) {
  console.log(req.body);
  var t = new targetModel(req.body);
  t.save();
  res.redirect('/target');
});

router.get('/delete/{id}', function(req, res, next) {
  res.render('target', {});
});

module.exports = router;