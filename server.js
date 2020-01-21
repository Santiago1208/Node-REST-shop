// Server you have to code when using nodejs

// This instruction is the homonime of import x from y.
const http = require('http')

// Port adquired from environment variable. Another way is hardcoding the port.
const port = process.env.PORT

// Creates a listener to listen request from internet
const server = http.createServer()
server.listen(port)