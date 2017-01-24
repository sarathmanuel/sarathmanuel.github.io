var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var User = require('../models/user.js');
var jwt = require('express-jwt');

var auth = jwt({ secret: 'SECRET', userProperty: 'payload' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', function(req, res, next){
	console.log('Posting new user:', req.body);
	if (!req.body.username || !req.body.password){
		return res.status(400).json({ message: 'Please fill out all fields' });
	}
	else {
		passport.authenticate('local-signup', function(err, user, info){
			console.log('>>>Passport authentication finished. Return user:', user);
			if (err) return next(err);

			else if (user) {
				console.log('Responding with json token...');
				return res.json({ token: user.generateJWT() });
			}
			else {
				return res.status(401).json(info);
			}
		})(req, res, next);
	}


	// var signupStrat = passport.authenticate('local-signup', function(err, user, info){
	// 	console.log('passport.authenticate complete:', user);
	// });
	// return signupStrat(req, res, next);

	// var signUpStrategy = passport.authenticate('local-signup', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/'
	// })
	// if (!req.body.username || !req.body.password){
	// 	return res.status(400).json({ message: 'Please fill out all fields' });
	// }
  	// else {
		// passport.authenticate('local-signup', function(req, res){
		// 	console.log('authenticated signup. returning res.json user.generateJWT...', req.user);
		// 	return res.json({ token: req.user.generateJWT() });
		// });
	// }
});

router.post('/login', function(req, res, next){
	if(!req.body.username || !req.body.password){
		return res.status(400).json({ message: 'Please fill out all fields' });
	}
	else {
		passport.authenticate('local-login', function(err, user, info){
			if (err) return next(err);

			else if (user){
				return res.json({ token: user.generateJWT() });
			} 
			else {
				return res.status(401).json(info);
			}
		})(req, res, next);
	}
})

module.exports = router;
