var mongoose = require('mongoose');
var moment = require('moment');


var Schema = mongoose.Schema;

var BookInstanceSchema = Schema({
	book: {type: Schema.ObjectId, ref: 'Book', required: true},
	imprint: {type: String, required: true},
	status: {type: String, required: true, enum: ['Owned', 'Donated', 'Borrowed', 'Lent', 'Recommended'], default: 'Owned'}
});

BookInstanceSchema
.virtual('url')
.get(function(){
	return '/catalog/bookinstance/' + this._id;
});

BookInstanceSchema
.virtual('due_back_formatted')
.get(function() {
	return moment(this.due_back).format('DD MMM YYYY');
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);