
exports.up = function(knex) {
  return knex.schema.table("trades", (table) => {
      // opening order id for the trade
      table.integer("opening_order_id").unsigned().notNullable()
      table.foreign("opening_order_id")
        .references("id")
        .inTable("orders")

      // closing order id for the trade
      table.integer("closing_order_id").unsigned()
      table.foreign("closing_order_id")
        .references("id")
        .inTable("orders")

      // stop loss order id for the trade
      table.integer("stop_loss_order_id").unsigned()
      table.foreign("stop_loss_order_id")
        .references("id")
        .inTable("orders")
  })
};

exports.down = function(knex) {
  return knex.schema.table("trades", (table) => {
      table.dropColumn("opening_order_id")
      table.dropColumn("closing_order_id")
      table.dropColumn("stop_loss_order_id")
  })
};
