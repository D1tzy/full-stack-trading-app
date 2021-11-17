const service = require("./bots.service")

async function list(req, res, next) {
    const { market, status } = res.locals 

    res.json(await service.list(market, status))
}

async function create(req, res, next) {
    res.json(await service.create(res.locals.data))
}

function read(req, res, next) {
    res.json(res.locals.readData)
}

async function destroy(req, res, next) {
    res.json(await service.destroy(res.locals.id))
}

async function update(req, res, next) {
    for (let each in res.locals.data) {
        if (!each) continue
        await service.update(res.locals.id, each, res.locals.data[each])
    }

    res.json(await service.read(res.locals.id))
}


// MIDDLEWARE FUNCTIONS //

// makes sure there is a market value for all requests except GET requests
// makes sure the status is valid for GET requests
function properQuery(req, res, next) {
    const { market, status } = req.query

    if (market && market !== "crypto" && market !== "stock") return next({status: 400, message: "Invalid market"})
    if (status && status !== "active" && status !== "paused" && status !== "created" && status !== "archived") return next({status: 400, message: "Invalid status"})

    if (market) res.locals.market = market
    if (status) res.locals.status = status

    return next()
}

function validBody(req, res, next) {
    const data = req.body.data

    if (!req.body || !data) return next({status: 400, message: "Missing data to input"})

    const {

        status,
        market = res.locals.market, 
        derivative_type,
        strategy, 
        ticker, 
        percent_profit_goal,
        take_profit_in_base_asset_percent,
        percent_stop_loss,
        percent_safety_order,
        max_safety_orders,
        max_leverage,
        capital_per_trade,
        base_per_trade,
        base_in_quote_per_trade,
        capital_allocated,
        asset_amount_allocated,
        datetime_started,
        datetime_paused,
        hours_active,
        lifetime_quote_profit,
        lifetime_base_profit,

    } = data

    console.log(market)
    
    /* REQUIRED FIELDS */

    // market
    // for not-nullable fields, the fields are required for POST methods
    // they are not required for PUT methods
    if ((req.method === "POST") && !market) return next({status: 400, message: "Missing market field, this field is required when making a new bot."})
    if (market && market !== "crypto" && market !== "stock"  && market !== "forex") return next({status: 400, message: "Invalid market, must be crypto, stock, or forex."})

    // strategy
    if (req.method === "POST" && !strategy) return next({status: 400, message: "Missing strategy field, this field is required when making a new bot."})
    if (strategy && strategy.length === 0) return next ({status: 400, message: "The strategy field can not be empty."})
    if (strategy && typeof strategy !== "string") return next({status: 400, message: "Invalid strategy, must be a string."})
    
    // ticker
    if (req.method === "POST" && !ticker) return next({status: 400, message: "Missing ticker field."})
    if (ticker && ticker.length === 0) return next ({status: 400, message: "The ticker field can not be empty, this field is required when making a new bot."})
    if (ticker && typeof ticker !== "string") return next({status: 400, message: "Invalid ticker symbol, must be a string."})
    
    // profit goal
    if (req.method === "POST" && !percent_profit_goal) return next({status: 400, message: "Missing percent profit goal field, this field is required when making a new bot."})
    if (percent_profit_goal && percent_profit_goal <= 0) return next({status: 400, message: "Missing percent profit goal field."})
    if (percent_profit_goal && isNaN(percent_profit_goal)) return next({status: 400, message: "Invalid percent profit goal field, must be a number."})
    
    
    
    /* OPTIONAL FIELDS */

    // status
    if (status && status !== "active" && status !== "paused" && status !== "archived") return next({status: 400, message: "Invalid status, must be active, paused, or archived."})
    // put methods can not set status to created
    if (req.method === "PUT" && status === "created") return next({status: 400, message: "Can not set a bot's status to created. That status is reserved for new bots."})

    // derivative type
    if (derivative_type && derivative_type !== "option" && derivative_type !== "future") return next({status: 400, message: "Invalid derivative type, must be 'option' or 'future'."})
    
    // take profit in base asset percent
    if (take_profit_in_base_asset_percent && isNaN(take_profit_in_base_asset_percent)) return next({status: 400, message: "Invalid take profit in base asset percent, must be a number."})
    if (take_profit_in_base_asset_percent && take_profit_in_base_asset_percent <= 0) return next({status: 400, message: "Invalid take profit in base asset percent, value must be greater than 0"})
    
    // percent stop loss
    if (percent_stop_loss && isNaN(percent_stop_loss)) return next({status: 400, message: "Invalid percent stop loss, must be a number."})
    if (percent_stop_loss && percent_stop_loss <= 0) return next({status: 400, message: "Invalid percent stop loss, value must be greater than 0."})

    // percent safety order
    if (percent_safety_order && isNaN(percent_safety_order)) return next({status: 400, message: "Invalid percent safety order, must be a number."})
    if (percent_safety_order && percent_safety_order <= 0) return next({status: 400, message: "Invalid percent safety order, value must be greater than 0."})

    // max safety orders
    if (max_safety_orders && (isNaN(max_safety_orders) || !Number.isInteger(max_safety_orders))) return next({status: 400, message: "Invalid max safety orders, value must be an integer."})
    if (max_safety_orders && max_safety_orders <= 0) return next({status: 400, message: "Invalid max safety orders, value must be greater than 0"})

    // max leverage
    if (max_leverage && (isNaN(max_leverage) || !Number.isInteger(max_leverage))) return next({status: 400, message: "Invalid max leverage, value must be an integer."})
    if (max_leverage && max_leverage <= 0) return next({status: 400, message: "Invalid max leverage, value must be greater than 0."})

    // capital per trade 
    if (capital_per_trade && isNaN(capital_per_trade)) return next({status: 400, message: "Invalid quote asset per trade field, must be a number."})
    if (capital_per_trade && capital_per_trade <= 0) return next({status: 400, message: "Invalue quote asset per trade field, must be greater than 0."})
    
    // base per trade 
    if (base_per_trade && isNaN(base_per_trade)) return next({status: 400, message: "Invalid base asset per trade field, must be a number."})
    if (base_per_trade && base_per_trade <= 0) return next({status: 400, message: "Invalid base asset per trade field, must be greater than 0."})

    // base in quote per trade 
    if (base_in_quote_per_trade && isNaN(base_in_quote_per_trade)) return next({status: 400, message: "Invalid base asset in quote per trade field, must be a number."})
    if (base_in_quote_per_trade && base_in_quote_per_trade <= 0) return next({status: 400, message: "Invalid base asset in quote per trade field, must be greater than 0."})

    // capital allocated 
    if (capital_allocated && isNaN(capital_allocated)) return next({status: 400, message: "Invalid quote currency allocated field, field must be a number"})
    if (capital_allocated && capital_allocated < capital_per_trade) return next({status: 400, message: "Invalid quote currency allocated field, field must be greater than the quote asset per trade field."})

    // base amount allocated 
    if (asset_amount_allocated && isNaN(asset_amount_allocated)) return next({status: 400, message: "Invalid base currency allocated field, field must be a number."})
    if (asset_amount_allocated && asset_amount_allocated < base_per_trade) return next({status: 400, message: "Invalid base currency allocated field, field must be greater than base asset per trade field."})

    // datetime started

    // datetime paused

    // hours active
    if (hours_active && (isNaN(hours_active) || !Number.isInteger(hours_active))) return next({status: 400, message: "Invalid hours active, must be an integer."})
    if (hours_active && hours_active <= 0) return next({status: 400, message: "Invalid hours active, value must be greater than 0."})

    // lifetime quote profit
    if (lifetime_quote_profit && isNaN(lifetime_quote_profit)) return next({status: 400, message: "Invalid lifetime quote profit, must be a number."})
    if (lifetime_quote_profit && lifetime_quote_profit <= 0) return next({status: 400, message: "Invalid lifetime quote profit, value must be greater than 0."})

    // lifetime base profit
    if (lifetime_base_profit && isNaN(lifetime_base_profit)) return next({status: 400, message: "Invalid lifetime base profit, must be a number."})
    if (lifetime_base_profit && lifetime_base_profit <= 0) return next({status: 400, message: "Invalid lifetime base profit, value must be greater than 0."})

    res.locals.data = data

    return next()
}

async function validId(req, res, next) {
    const { id } = req.params

    const data = await service.read(id)

    if (data.length === 0) return next({status: 400, message: "Invalid bot ID"})

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