var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.100.3/buzzer');

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
});

module.exports = mongoose.model('target',schema);