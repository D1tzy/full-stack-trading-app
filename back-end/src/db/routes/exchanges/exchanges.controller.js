const service = require("./exchanges.service")

async function list(req, res, next) {
    res.json(await service.list())
}

function read(req, res, next) {
    res.json(res.locals.readData)
}

async function create(req, res, next) {
    res.json(await service.create(res.locals.data))
}

async function update(req, res, next) {
    for (let each in res.locals.data) {
        await service.update(res.locals.id, each, res.locals.data[each])
    }

    res.json(await service.read(res.locals.id))
}

async function destroy(req, res, next) {
    res.json(await service.destroy(res.locals.id))
}

async function validId(req, res, next) {
    const { id } = req.params

    const data = await service.read(id)

    if (data.length === 0) return next({status: 400, message: "Invalid exchange ID."})

    res.locals.readData = data
    res.locals.id = id

    return next()
}

function validBody(req, res, next) {
    const { data } = req.body 

    if (!data || data.length === 0) return next({status: 400, message: "Missing data. The data should be in the request body, in a json object called 'data'"})

    const {
        exchange,
        api_key,
        private_key,
        secret_phrase
    } = data
    
    // name of the exchange is required for post requests
    if (req.method === "POST" && !exchange) return next({status: 400, message: "Name of the exchange is required for post requests"})
    if (exchange && exchange.length === 0) return next({status: 400, message: "Name of the exchange must be longer than 0"})

    // api key
    if (req.method === "POST" && (!api_key || api_key.length === 0)) return next({status: 400, message: "API key is required when adding a new exchange."})
    if (api_key && (!api_key || api_key.length === 0)) return next({status: 400, message: "Please input a valid API key."})

    // private key is required for post requests
    if (req.method === "POST" && (!private_key || private_key.length === 0)) return next({status: 400, message: "Private key is required when adding a new exchange."})
    if (private_key && (!private_key || private_key.length === 0)) return next({status: 400, message: "Please input a valid private key."})

    // secret phrase
    if (secret_phrase && (!secret_phrase || secret_phrase.length === 0)) return next({status: 400, message: "Please input a valid secret phrase"})

    return next()
}

module.exports = {
    list,
    read: [validId, read],
    create: [validBody, create],
    update: [validId, validBody, update],
    delete: [validId, destroy]
}