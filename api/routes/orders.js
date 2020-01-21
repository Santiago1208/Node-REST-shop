const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity: req.body.productQuantity
    }
    res.status(200).json({
        message: 'Order was created',
        createdOrder: order
    })
})

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId
    })
})

// Allows to import the products file in app.js
module.exports = router