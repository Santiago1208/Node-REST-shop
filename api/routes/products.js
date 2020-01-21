const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// Imports the Product model
const Product = require('../models/product')

// get method is the representation of GET HTTP verb.
// Find all products
router.get('/', (req, res, next) => {
    Product.find().exec().then(docs => {
        console.log(docs)
        if (docs.length >= 0) {
            res.status(200).json(docs)
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
            message: 'Handling POST requests to /products',
            createdProduct: result
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
    Product.findById(id).exec().then(doc => {
        console.log(doc)
        if (doc) {
            res.status(200).json(doc)
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
    Product.update({_id: req.params.productId}, {$set: updateOptions}).then(result => {
        console.log(result)
        res.status(200).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// Deletes one product
router.delete('/:productId', (req, res, next) => {
    Product.remove({_id: req.params.productId}).exec().then(result => {
        console.log(result)
        res.status(200).json({
            message: 'Deleted product',
            result: result
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