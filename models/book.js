var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = Schema({
	title: {type: String, required: true},
	author: [{type: Schema.ObjectId, ref: 'Author', required: true}],
	summary: {type: String},
	rating: {type: Integer, num: [1, 2, 3, 4, 5]},
	notes: {type: String},	
	isbn: {type: String, required: true},
	genre: [{type: Schema.ObjectId, ref: 'Genre'}],
	topic: [{type: Schema.ObjectId, ref: 'Topic'}],	
	challenge: [{type: String, ref: 'Challenge'}],
	medium: {type: String, required: true, enum: ['Kindle', 'Audiobook', 'Hard Copy'], default: 'Hard Copy'},
	position: {type: String, enum: ['Read', 'To Read', 'Abandonded', 'Currently Reading', default: 'To Read'},
	era: {type: String, required: true, enum: ['Up to 500BC', '500BC to 500AD', '500AD to 1300AD', '1300AD to 1650AD', '1650AD to 1970AD', '1970AD to Present', 'Spanning'], default: '1970 to Present'}	
});

BookSchema
.virtual('url')
.get(function(){
	return '/catalog/book/' + this._id;
});

module.exports = mongoose.model('Book', BookSchema);