const express = require('express')
const products = require('./products')
const { blockSpecialBrand, isExistProduct } = require('./middleware')

const router = express.Router()

// handle get request for path /products
router.get('/products', (request, response) => {
	return response.json(products)
})

// handle get request for path /products
router.get('/products/:id', isExistProduct, (request, response) => {
	console.log('request.params.id :>> ', request.params.id)

	const productId = parseInt(request.params.id, 10)

	const product = products.find(p => p.id === productId)

	return response.json(product)
})

// handle get request for path /products/:brand
router.get('/products/brand/:brand', blockSpecialBrand, (request, response) => {
	const { brand } = request.params // Access the brand parameter from the URL

	// Filter products based on the brand parameter
	const filteredProducts = products.filter(product => product.brand === brand)

	response.json(filteredProducts) // Send the filtered products as a JSON response
})

router.get('/productswitherror', (request, response) => {
	let err = new Error('processing error ')
	err.statusCode = 400
	throw err
})

module.exports = router
