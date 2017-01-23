var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, next){
	// Find a user with this email OR username
	User.findOne({ $or: [
		{ 'local.email': email },
		{ 'username': req.body.username }
	]},
	function(err, foundUser){
		if (err){
			return next(err);
		}
		else if (foundUser){
			if (foundUser.local.email === req.body.email){
				return next(null, false, { message: 'Sorry! This email is already taken.' });
			}
			else if (foundUser.username === req.body.username){
				return next(null, false, { message: 'Sorry! This username is already taken.' });
			}
			else {
				return next(null, false, { message: 'Error: User sign up error.' });
			}
		}
		else {
			// Create new user if email AND username not taken.
			var newUser = new User();
			newUser.local.email = email;
			newUser.setPassword(password);
			newUser.username = req.body.username;

			newUser.save(function(err){
				if (err) return next(err);
				
				return res.json({ token: newUser.generateJWT() });
			});
		}
	});
});

module.exports = strategy;
