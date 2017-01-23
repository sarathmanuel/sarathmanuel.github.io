var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

var strategy = new LocalStrategy({
	usernameField: 'emailOrUsername',
	passwordField: 'password',
	passReqToCallback: true
},
function(req, email, password, next){
	User.findOne({ $or: [
		{ 'local.email': req.body.emailOrUsername },
		{ 'username': req.body.emailOrUsername }
  ]},
		function(err, foundUser){
			if (err){
				console.log('Whoops! There was an unknown error.');
				return next(err);
			}
			else if (!foundUser) {
				console.log('user not found in db');
				return next(null, false, { message: 'Whoops! Wrong user credentials.' });
			}
			else if (!foundUser.validPassword(password)){
				console.log('wrong password');
				return next(null, false, { message: 'Whoops! Wrong user credentials.' });
			}
			else {
				console.log('successfully logged in!');
				return next(null, foundUser);
			}
		});
});

module.exports = strategy;
