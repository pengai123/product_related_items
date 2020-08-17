/* eslint-disable no-undef */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/Greenfield', { useNewUrlParser: true, useUnifiedTopology: true }); //'test' is database name

const Style = mongoose.model('style', {
	id: { type: Number, unique: true },
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: String
});


module.exports = Style;