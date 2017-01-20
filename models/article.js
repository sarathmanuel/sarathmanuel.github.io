var mongoose = require('mongoose');

var ArticleSchema = new mongoose.Schema({
	// author: 		{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	author: 		{ type: String, required: true },
	title:			{ type: String, required: true },
	body: 			{ type: String, required: true },
	date:			{ type: String, required: true },
	url:			{ type: String, required: true },
	source:			{ type: String },
	tags:			{ type: Array },
	likes:			{ type: Number, default: 0 },			//can go negative
	views:			{ type: Number, default: 0 },			//need to find a way to make this unique views.
	shares:			{ type: Number, default: 0 },
	hidden: 		{ type: Boolean, default: false, required: true },
}, { timestamps : true });

module.exports = mongoose.model('Article', ArticleSchema);