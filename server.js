const express = require("express");
const app = express();
const port = 4000;
const bp = require("body-parser");
const axios = require("axios");
const Product = require("./database/products.js")

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static("client/dist"));

const insertProducts = function () {

	axios.get("http://52.26.193.201:3000/products/list")
		.then(result => {
			Product.create(result.data)
			.then(() => console.log('products infomation saved into database!'))
			.catch(()=>console.log('products infomation already in the database!'));
		})
};

//Product.deleteMany().then(() => console.log('database cleared'))
insertProducts();



app.get("/relatedItems/:id", (req, res) => {
	console.log('product id:', req.params.id)

	Product.find()
	.then(result => {
		res.statusCode = 200;
		res.send(result);
	})
	// axios.get(`http://52.26.193.201:3000/products/${req.params.id}/related`)
	// 	.then(result => {
	// 		console.log('result:', result.data)
	// 	})
	// res.send(req.params.id)

})
app.listen(port, function () {
	console.log(`Listening on port ${port}`);
})