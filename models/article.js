var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	// author: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	author: 		{ type: String, required: true },
	title:			{ type: String, required: true },
	body: 			{ type: String, required: true },
	date:			{ type: String, required: true },
	source:			{ type: String, required: true },
	url:			{ type: String, required: true },
	tags:			{ type: Array },
	likes:			{ type: Number, required: true },		//starts as 0, can go negative
	hidden: 		{ type: Boolean, required: true },		//starts as false
}, { timestamps : true });

module.exports = mongoose.model('Article', ArticleSchema);