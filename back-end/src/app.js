const express = require('express')
const cors = require('cors')

const botsRouter = require("./db/routes/bots/bots.router")
const ordersRouter = require("./db/routes/orders/orders.router")
const tradesRouter = require("./db/routes/trades/trades.router")
const exchangesRouter = require("./db/routes/exchanges/exchanges.router")

const notFound = require('../utils/notFound')
const errorHandler = require('../utils/errorHandler')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/bots', botsRouter)
app.use('/orders', ordersRouter)
app.use('/trades', tradesRouter)
app.use('/lifetime-profit', exchangesRouter)

app.use(notFound)
app.use(errorHandler)

module.exports = app