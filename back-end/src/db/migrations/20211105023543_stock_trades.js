
exports.up = function(knex) {
  return knex.schema.createTable("stock_trades", (table) => {
      // id of the trade
      table.increments("stock_trade_id").primary()

      // long or short
      table.string("position").notNullable().defaultTo("long")

      // position size
      // will be dollars if long, or in the asset if short
      table.decimal("position_size").unsigned().notNullable()

      // price the order to open the trade was filled
      table.decimal("filled_price")

      // dollars received from sale
      // OR 
      // shares or contracts receieved from the buy
      table.decimal("opening_trade_result", null).unsigned().notNullable()

      // date order was filled and position was opened
      // FORMAT: time A.M./P.M., str month int day, int year
      // Will assume EST
      table.datetime("trade_start_date", options={useTz: false})//.defaultTo(new Date(Date.now()).toDateString())
      
      // strategy used for the trade
      table.string("strategy").notNullable()

      // status of the trade: active, complete, cancelled
      table.string("status").defaultTo("active")

      // corresponding bot id the trade belongs to
      table.integer("bot_id").unsigned().notNullable()
      table.foreign("bot_id")
        .references("id")
        .inTable("stock_bots")
        .onDelete("CASCADE")
        
      // corresponde order id that would close the trade
      table.integer("closing_trade_id").defaultTo(null)
      table.foreign("closing_trade_id")
        .references("stock_order_id")
        .inTable("stock_orders")
        .onDelete("CASCADE")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("stock_trades")
};
