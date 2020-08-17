/* eslint-disable no-undef */
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
				.catch(() => console.log('products infomation already in the database!'));
		})
};

//Product.deleteMany().then(() => console.log('database cleared'))
insertProducts();



app.get("/relatedItems/:id", (req, res) => {
	//console.log('product id:', req.params.id)

	axios.get(`http://52.26.193.201:3000/products/${req.params.id}/related`)
		.then(result => {
			res.send(result.data);
		})
		.catch((err)=>console.log(err));
})


app.get("/products/:id", (req, res) => {
	//productData, styleData, reviewData

	axios.get(`http://52.26.193.201:3000/products/${req.params.id}`)
		.then(result => {
			
			res.send(result.data)
		})

})

app.get("/reviews/:id", (req, res) => {
	//productData, styleData, reviewData

	axios.get(`http://52.26.193.201:3000/reviews/${req.params.id}/meta`)
		.then(result => {
			
			res.send(result.data)
		})

})

app.get("/styles/:id", (req, res) => {
	//productData, styleData, reviewData

	axios.get(`http://52.26.193.201:3000/products/${req.params.id}/styles`)
		.then(result => {
			
			res.send(result.data)
		})
})

app.get("/qa/:id", (req, res) => {
	//productData, styleData, reviewData

	axios.get(`http://52.26.193.201:3000/qa/${req.params.id}`)
		.then(result => {
			res.send(result.data)
		})
})


app.listen(port, function () {
	console.log(`Listening on port ${port}`);
})