const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Imports the Product model
const Product = require('../models/product')

// get method is the representation of GET HTTP verb.
// Find all products
router.get('/', (req, res, next) => {
    Product.find().select('_id name price').exec().then(docs => {
        const response = {
            count: docs.length,
            products: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    price: doc.price,
                    request: {
                        verb: "GET",
                        url: "http://localhost:3000/products"
                    }
                }
            })
        }
        if (docs.length >= 0) {
            res.status(200).json(response)
        } else {
            res.status(404).json({
                message: 'No products saved yet'
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
    
})

// Create a new product
router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.productName,
        price: req.body.productPrice
    })
    product.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: 'Product created succesfully!',
            createdProduct: {
                _id: result._id,
                name: result.name,
                price: result.price,
                request: {
                    verb: "PUT",
                    url: "http://localhost:3000/products/" + result._id
                }
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

// Find one product by ID
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    Product.findById(id).select('_id name price').exec().then(doc => {
        console.log(doc)
        if (doc) {
            res.status(200).json({
                product: doc,
                request: {
                    verb: 'GET',
                    url: 'http://localhost:3000/products' + id
                }
            })
        } else {
            res.status(404).json({
                message: 'No product saved with the ID ' + id
            })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

// Modifies one product
router.patch('/:productId', (req, res, next) => {
    const updateOptions = {}
    for (const options of req.body) {
        updateOptions[options.propName] = options.value;
    }
    const productId = req.params.productId
    Product.update({_id: productId}, {$set: updateOptions}).then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Product updated succesfully',
            request: {
                verb: 'PATCH',
                url: 'http://localhost:3000/products/' + productId
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Deletes one product
router.delete('/:productId', (req, res, next) => {
    const productId = req.params.productId
    Product.remove({_id: productId}).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Produc deleted succesfully!',
            request: {
                verb: 'DELETE',
                url: 'http://localhost:3000/products/' + productId
            }
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
    
})

// Allows to import the products file in app.js
module.exports = router