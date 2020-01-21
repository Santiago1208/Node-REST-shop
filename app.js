const express = require('express')
const app = express()

// API's routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

app.use('/products', productRoutes)
app.use('/orders', orderRoutes)

module.exports = app