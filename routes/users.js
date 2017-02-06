var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js');
var passport = require('passport');
var jwt = require('express-jwt');

// create middleware to authenticate user's JWT.
// MUST CHANGE 'secret' LATER TO AN ENVIRONMENT VARIABLE.
// var auth = jwt({ secret: 'secret', userProperty: 'payload' });

// route for editing user's profile. needs auth. then serve new JWT (?).
router.post('/', function(req, res, next){
	// for edit username or email: run mongoose check.
	// for edit password, need confirmPassword validation.
	console.log('>>>Editing user: req.body:', req.body)
})

// route for deleting user's account. needs auth. then delete JWT.
router.delete('/', function(req, res, next){
	console.log('>>>DELETE user: req.body:', req. body);
});

module.exports = router;
