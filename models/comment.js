var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	author: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	article:		{ type: mongoose.Schema.Types.ObjectId, ref: 'Article', required: true},
	parent:			{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' },
	body: 			{ type: String, required: true },
	likes:			{ type: Number, required: true },		//starts as 0, can go negative
	hidden: 		{ type: Boolean, required: true },		//starts as false
}, { timestamps : true });

module.exports = mongoose.model('Comment', CommentSchema);