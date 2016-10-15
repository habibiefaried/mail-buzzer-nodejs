var express = require('express');
var router = express.Router();
var targetModel = require('../model/target');
var fs = require('fs-extra');
var csv = require("fast-csv");

router.get('/', function(req, res, next) {
	targetModel.find({},function(err,data){
		if (err) throw err;
		else res.render('target/index', {data:data});
	});
});

router.get('/add', function(req, res, next) {
	res.render('target/add', {});
});

router.post('/add', function(req, res, next) {
  	var fstream;
	var data = {};
	req.busboy.on('field', function(fieldname, val) {
	    data[fieldname] = val;
	});

	req.pipe(req.busboy);
	req.busboy.on('file', function (fieldname, file, filename) {
		console.log(fieldname);
		if (filename != '') {
		    console.log("Uploading: " + filename);

		    //Path where image will be uploaded
		    var loc = __dirname + '/../public/uploads/' + filename;
		    fstream = fs.createWriteStream(loc);
		    file.pipe(fstream);
		    fstream.on('close', function () {    
		        console.log("Upload Finished of " + filename);
		        csv
				 .fromPath(loc)
				 .on("data", function(data){
				     console.log(data);
				 })
				 .on("end", function(){
				     console.log("done");
				     res.redirect('/target');
				 });
		    });
	    } else {
	    	new targetModel(data).save();
	    	res.redirect('/target');
	    }
	});
});

router.get('/delete/:id', function(req, res, next) {
  targetModel.remove({_id: req.params.id}, function(err){
  	if (err) throw err;
  	else res.redirect('/target');
  });
});

router.get('/deleteall', function(req, res, next) {
  targetModel.remove({}, function(err){
  	if (err) throw err;
  	else res.redirect('/target');
  });
});

module.exports = router;