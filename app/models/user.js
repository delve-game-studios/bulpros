var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username: String,
	password: String,
	firstName: String,
	lastName: String,
	active: Boolean
});

module.exports = mongoose.model('User', userSchema);