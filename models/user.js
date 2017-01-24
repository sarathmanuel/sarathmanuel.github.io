var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var UserSchema = new mongoose.Schema({
	local: {
		email: 		{ type: String, required: true , lowercase: true, trim: true },
		hash:		{ type: String },
		salt:		{ type: String }
	},
	username: 		{ type: String, required: true , lowercase: true, trim: true },
	location: 		{ type: String },
	signature:		{ type: String },
	comments: 		{ type: String },
	verified: 		{ type: Boolean, default: false },	// maybe don't need conf email?
	status: 		{ type: String, enum: ['active', 'inactive', 'banned'], default: 'active' },
	role: 			{ type: String, enum: ['user', 'admin'], default: 'user'}
}, { timestamps : true });

UserSchema.methods.setPassword = function(password) {
	this.local.salt = crypto.randomBytes(16).toString('hex');
	this.local.hash = crypto.pbkdf2Sync(password, this.local.salt, 1000, 64).toString('hex');
}

UserSchema.methods.validPassword = function(password) {
	var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
	return this.hash === hash;
}

UserSchema.methods.generateJWT = function() {
	var today = new Date();
	var expire = new Date(today);
	expire.setDate(today.getDate() + 60);

	return jwt.sign({
		_id: this._id,
		username: this.username,
		expiration: parseInt(expire.getTime() / 1000),
	}, 'SECRET');
}

module.exports = mongoose.model('User', UserSchema);