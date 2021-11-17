const knex = require("../../connection")

function list(market, status) {
    console.log(market, status)
    if (market && status) {
        return knex("bots")
            .where({"market": market})
            .where({"status": status})
    }

    if (market) {
        return knex("bots")
            .where({"market": market})
    }

    if (status) {
        return knex("bots")
            .where({"status": status})
    }

    return knex("bots")

}

function create(data) {
    return knex("bots")
        .insert(data)
        .returning("*")
        .then(newData => newData[0])
}

function read(id) {
    return knex("bots")
        .where({"id": id})
}

function destroy(id) {
    return knex("bots")
        .where({"id": id})
        .del()
}

function update(id, column, data) {
    return knex("bots")
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