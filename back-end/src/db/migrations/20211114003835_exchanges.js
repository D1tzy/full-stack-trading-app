
exports.up = function(knex) {
  return knex.schema.createTable("exchanges", (table) => {
    // unique ID of the exchange
    table.uuid("id").primary()

    // string of the exchange name
    table.string("exchange").notNullable()

    // API key 
    table.string("api_key")

    // private key
    table.string("private_key")

    // secret phrase
    table.string("secret_phrase")
  })
  
};

exports.down = function(knex) {
  return knex.schema.dropTable("exchanges")
};
