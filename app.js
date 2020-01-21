const express = require('express')
const app = express()
const morgan = require('morgan')

// API's routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// Logging utility
app.use(morgan('dev'))

// Request handlers
app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

// Catch errors from requests not supported by the API
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status= 404
    next(error)
})

// Catch errors from internal server processes
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app