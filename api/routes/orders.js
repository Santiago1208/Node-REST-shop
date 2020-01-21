const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Order = require('../models/order')
const Product = require('../models/product')

router.get('/', (req, res, next) => {
    Order.find().select('-__v').exec().then(result => {
        if (result) {
            res.status(200).json({
                count: result.length,
                orders: result
            })
        } else {
            res.status(404).json({
                message: 'No orders saved yet'
            })
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
    
})

router.post('/', (req, res, next) => {
    const productId = req.body.productId
    Product.findOne(productId).select('_id').exec().then(result => {
        const order = new Order({
            _id: new mongoose.Types.ObjectId(),
            productId: productId,
            quantity: req.body.productQuantity
        })
        order.save().then(result =>{
            res.status(201).json({
                message: 'Order was created',
                createdOrder: result
            })
        }).catch(error => {
            res.status(500).json({
                error: error
            })
        })
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
    
})

router.get('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId
    Order.findById(orderId).select('-__v').exec().then(result => {
        if (result) {
            res.status(200).json({
                order: result
            })
        } else {
            res.status(404).json({
                message: 'No order saved with the ID ' + orderId
            })
        }
    }).catch(error => {
        res.status(500).json({
            error: error
        })
    })
    
})

// Allows to import the products file in app.js
module.exports = router