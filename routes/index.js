var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
var Article = require('../models/article.js');

var passport = require('passport');
var jwt = require('express-jwt');

// create middleware to authenticate user's JWT.
// MUST CHANGE 'secret' LATER TO AN ENVIRONMENT VARIABLE.
var auth = jwt({ secret: 'secret', userProperty: 'payload' });

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index');
});

// POST user register, respond with JWT.
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
		})(req, res, next);		// what the does this line do? is this an IIFE?
	}
});

// POST user login, respond with JWT.
router.post('/login', function(req, res, next){
	console.log('>>>POST - Login attempt:', req.body);
	if (!req.body.emailOrUsername || !req.body.password){
		return res.status(400).json({ message: 'Please fill out all fields' });
	}
	else {
		passport.authenticate('local-login', function(err, user, info){
			console.log('>>>Passport-Login authentication finished. Return user:', user);
			if (err) return next(err);

			else if (user){
				console.log('Responding with json token...');
				return res.json({ token: user.generateJWT() });
			} 
			else {
				return res.status(401).json(info);
			}
		})(req, res, next);		// what the does this line do? is this an IIFE?
	}
});

// route for getting comments.
router.get ('/comment', function(req, res, next){
	Comment.find({ })
	.then(function(articles){
		console.log(articles);
		res.json(articles);
	});
});

// route for posting comments or replies. needs auth
router.post ('/comment', auth, function(req, res, next){
	console.log('>>>POST for new comment received: req.body: ', req.body);
});

// route for deleting comments. needs auth
router.delete('/comment', auth, function(req, res, next){
	console.log('>>>DELETE comment: req.body:', req. body);
});

// Get articles based on current page number.
router.get('/article', function(req, res, next){

})

module.exports = router;
