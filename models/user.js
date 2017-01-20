var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	local: {
		email: 		{ type: String, required: true , trim: true },
		password:	{ type: String, required: true }
	},
	username: 		{ type: String, required: true , trim: true },
	location: 		{ type: String, trim: true },
	signature:		{ type: String },
	comments: 		{ type: String },
	status: 		{ type: String, required: true }, 		// active, inactive, or banned
	verified: 		{ type: Boolean, required: true , default: false },	// maybe don't need conf email
	role: 			{ type: String, required: true , default: 'user'}
}, { timestamps : true });

// UserSchema.methods.encrypt = function(password){
// 	return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
// };

// UserSchema.methods.isValidPassword = function(password){
// 	return bcrypt.compareSync(password, this.local.password);
// };

module.exports = mongoose.model('User', UserSchema);