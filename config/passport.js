var passport = require('passport');
var User = mongoose.model('User');
// var LocalStrategy = require('passport-local').Strategy;
// var mongoose = require('mongoose');

// passport.use(new LocalStrategy(
// 	function(username, password, next) {
// 		User.findOne({ username: username }, function(err, user){
// 			if (err) return next(err);
// 			if (!user || !user.validPassword(password)) {
// 				return next(null, false, { message: 'Incorrect username or password.' });
// 			}
// 			return next(null, user);
// 		});
// 	}
// ));

var localSignupStrategy = require('./local-signup-strategy');
var localLoginStrategy = require('./local-login-strategy');

var passportConfig = function(passport){
	// Add strategies
	passport.use('local-signup', localSignupStrategy);
	passport.use('local-login', localLoginStrategy);

	// Turn user obj into serial number
	//http://passportjs.org/docs/configure
	passport.serializeUser(function(user, callback){
		callback(null, user.id);
	});

	passport.deserializeUser(function(id, callback){
		User.findById(id, function(err, user){
			callback(err, user);
		});
	});
};

module.exports = passportConfig;