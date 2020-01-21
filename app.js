const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// API's routes
const productRoutes = require('./api/routes/products')
const orderRoutes = require('./api/routes/orders')

// Mongoose configuration
const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect('mongodb+srv://node-shop:' + process.env.MONGO_ATLAS_PASSWD + '@node-rest-shop-xb4n8.mongodb.net/test?retryWrites=true&w=majority', connectionOptions)
mongoose.Promise = global.Promise

// Logging utility
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Prevent CORS errors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

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