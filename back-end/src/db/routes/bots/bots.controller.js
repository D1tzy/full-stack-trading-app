const service = require("./bots.service")

async function list(req, res, next) {
    const { market, status } = res.locals 

    if (!market) {
        const crypto_bots = await service.list("crypto", status)
        const stock_bots = await service.list("stock", status)

        res.json({data: {crypto_bots, stock_bots}})
    }

    res.json(await service.list(market, status))  
}

async function create(req, res, next) {
    res.json(await service.create(res.locals.market, res.locals.data))
}

function read(req, res, next) {
    res.json(res.locals.readData)
}

async function destroy(req, res, next) {
    res.json(await service.destroy(res.locals.market, res.locals.id))
}

async function update(req, res, next) {
    for (let each in res.locals.data) {
        await service.update(res.locals.market, res.locals.id, each, res.locals.data[each])
    }

    res.json(await service.read(res.locals.market, res.locals.id))
}


// MIDDLEWARE FUNCTIONS //

// makes sure there is a market value for all requests except GET requests
// makes sure the status is valid for GET requests
function properQuery(req, res, next) {
    const { status } = req.query
    const { market } = req.params

    if (req.method !== "GET" && !market) return next({status: 400, message: "The market must be specified for all requests except GET requests."})
    if (market && market !== "crypto" && market !== "stock") return next({status: 400, message: "Invalid market"})
    if (status && status !== "active" && status !== "paused" && status !== "created" && status !== "archived") return next({status: 400, message: "Invalid status"})

    if (market) res.locals.market = market
    if (status) res.locals.status = status

    return next()
}

function validBody(req, res, next) {
    const data = req.body.data

    if (!req.body || !data) return next({status: 400, message: "Missing data to input"})

    if (res.locals.market === "crypto") {
        const {
            strategy,
            ticker,
            percent_profit_goal,
            quote_asset_per_trade,
            base_asset_per_trade,
            base_asset_in_quote_per_trade,
            quote_currency_allocated,
            base_currency_allocated
        } = data

        // strategy
        // for not-nullable fields, the fields are required for POST methods
        // they are not required for PUT methods
        if (req.method = "POST" && !strategy) return next({status: 400, message: "Missing strategy field, this field is required when making a new bot."})
        if (strategy && strategy.length === 0) return next ({status: 400, message: "The strategy field can not be empty."})
        if (strategy && typeof strategy !== "string") return next({status: 400, message: "Invalid strategy, must be a string."})
        
        // ticker
        if (req.method = "POST" && !ticker) return next({status: 400, message: "Missing ticker field."})
        if (ticker && ticker.length === 0) return next ({status: 400, message: "The ticker field can not be empty, this field is required when making a new bot."})
        if (ticker && typeof ticker !== "string") return next({status: 400, message: "Invalid ticker symbol, must be a string."})
        
        // profit goal
        if (req.method = "POST" && !percent_profit_goal) return next({status: 400, message: "Missing percent profit goal field, this field is required when making a new bot."})
        if (percent_profit_goal && percent_profit_goal <= 0) return next({status: 400, message: "Missing percent profit goal field."})
        if (percent_profit_goal && isNaN(percent_profit_goal)) return next({status: 400, message: "Invalid percent profit goal field, must be a number."})
        
        // quote asset per trade if applicable
        if (quote_asset_per_trade && isNaN(quote_asset_per_trade)) return next({status: 400, message: "Invalid quote asset per trade field, must be a number."})
        if (quote_asset_per_trade && quote_asset_per_trade <= 0) return next({status: 400, message: "Invalue quote asset per trade field, must be greater than 0."})
        
        // base asset per trade if applicable
        if (base_asset_per_trade && isNaN(base_asset_per_trade)) return next({status: 400, message: "Invalid base asset per trade field, must be a number."})
        if (base_asset_per_trade && base_asset_per_trade <= 0) return next({status: 400, message: "Invalid base asset per trade field, must be greater than 0."})

        // base asset in quote per trade if applicable
        if (base_asset_in_quote_per_trade && isNaN(base_asset_in_quote_per_trade)) return next({status: 400, message: "Invalid base asset in quote per trade field, must be a number."})
        if (base_asset_in_quote_per_trade && base_asset_in_quote_per_trade <= 0) return next({status: 400, message: "Invalid base asset in quote per trade field, must be greater than 0."})

        // quote currency allocated if applicable
        if (quote_currency_allocated && isNaN(quote_currency_allocated)) return next({status: 400, message: "Invalid quote currency allocated field, field must be a number"})
        if (quote_currency_allocated && quote_currency_allocated < quote_asset_per_trade) return next({status: 400, message: "Invalid quote currency allocated field, field must be greater than the quote asset per trade field."})

        // base currency allocated if applicable
        if (base_currency_allocated && isNaN(base_asset_per_trade)) return next({status: 400, message: "Invalid base currency allocated field, field must be a number."})
        if (base_currency_allocated && base_currency_allocated < base_asset_per_trade) return next({status: 400, message: "Invalid base currency allocated field, field must be greater than base asset per trade field."})
    }

    if (res.locals.market === "stock") {
        // INSERT STOCK SCHEMA HERE
        const {} = data
        console.log(res.locals.market)
        // stock verifications
    }

    res.locals.data = data

    return next()
}

async function validId(req, res, next) {
    const { market, id } = req.params

    const data = await service.read(market, id)

    if (!data) return next({status: 400, message: "Invalid bot ID"})

    res.locals.readData = data
    res.locals.id = id
    
    return next()
}



module.exports = {
    list: [properQuery, list],
    create: [properQuery, validBody, create],
    read: [properQuery, validId, read],
    update: [properQuery, validId, validBody, update],
    delete: [properQuery, validId, destroy]
}