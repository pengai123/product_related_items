/* eslint-disable no-undef */
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:/Greenfield', { useNewUrlParser: true, useUnifiedTopology: true })
	.then(result => console.log('mongodb connected!'))
	.catch(err => console.log('err:', err))



const Product = mongoose.model('product', {
	id: { type: Number, unique: true },
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: String
});


module.exports = Product;