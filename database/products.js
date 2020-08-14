const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:/Greenfield', { useNewUrlParser: true, useUnifiedTopology: true }); //'test' is database name
//, useCreateIndex: true 
const Product = mongoose.model('product', {
	id: { type: Number, unique: true },
	name: String,
	slogan: String,
	description: String,
	category: String,
	default_price: String
});


module.exports = Product;