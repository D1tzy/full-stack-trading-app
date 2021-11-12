const knex = require("../../connection")

function list(market, status) {
    if (market && status) {
        return knex(`${market}_bots`)
            .where({"status": status})
    }

    if (market) {
        return knex(`${market}_bots`)
    }
}

function create(market, data) {
    return knex(`${market}_bots`)
        .insert(data)
        .returning("*")
        .then(newData => newData[0])
}

function read(market, id) {
    return knex(`${market}_bots`)
        .where({"id": id})
}

function destroy(market, id) {
    return knex(`${market}_bots`)
        .where({"id": id})
        .del()
}

function update(market, id, column, data) {
    return knex(`${market}_bots`)
        .where({"id": id})
        .update(column, data)
}

module.exports = {
    list,
    create,
    read,
    destroy,
    update,
}