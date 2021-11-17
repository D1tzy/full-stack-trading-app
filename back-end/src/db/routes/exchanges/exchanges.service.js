const knex = require("../../connection")

function list() {
    return knex("exchanges")
}

function read(id) {
    return knex("exchanges")
        .where({"id": id})
}

function create(data) {
    return knex("exchanges")
        .insert(data)
        .returning("*")
        .then(newData => newData[0])
}

function update(id, column, data) {
    return knex("exchanges")
        .where({"id": id})
        .update(column, data)
}

function destroy(id) {
    return knex("exchanges")
        .where({"id": id})
        .del()
}

module.exports = {
    list,
    read,
    create,
    update,
    destroy
}