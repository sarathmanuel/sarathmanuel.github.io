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
// var auth = jwt({ secret: 'secret', userProperty: 'payload' });

router.get('/', function(req, res, next) {
  res.send('Hello, this is the admin panel!');
});

module.exports = router;