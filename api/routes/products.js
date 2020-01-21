const express = require('express')
const router = express.Router()

// get method is the representation of GET HTTP verb.
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    })
})

router.post('/', (req, res, next) => {
    const product = {
        name: req.body.productName,
        price: req.body.productPrice
    }
    res.status(200).json({
        message: 'Handling POST requests to /products',
        createdProduct: product
    })
})

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID'
        })
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
})

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product'
    })
})

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product'
    })
})

// Allows to import the products file in app.js
module.exports = router