
exports.up = function(knex) {
  return knex.schema.createTable("stock_orders", (table) => {
      // id for the order
      table.increments("stock_order_id").primary()

      // id on the exchange for the order
      table.integer("exchange_order_id").unsigned().notNullable()

      // if its buying or selling
      table.string("side").notNullable()

      // price the order is set to buy or sell
      table.decimal("price", null).notNullable()

      // order type
      table.string("order_type")

      // type of equity (stock, option, future, etc)
      table.string("equity_type").notNullable().defaultTo("stock")

      // amount of shares or contracts to be purchased for long positions or short positions closing out
      // OR
      // amount of shares or contracts to be sold for short positions or long positions closing out
      table.decimal("asset_amount", null).unsigned().notNullable()

      // amount of dollars to be recieved if it is a sell order
      // OR
      // amount of dollars to be used if it is a buy order
      table.decimal("dollar_amount", null).unsigned().notNullable()

      // profit in dollars if the order closes out a trade
      table.decimal("dollar_profit", null).unsigned().notNullable()

      // profit in the asset if the order closes out a trade 
      // AND if the bot has a take_profit_in_asset_percent value
      table.decimal("asset_profit", null).unsigned().notNullable()

      // boolean on if the order closes out a trade
      table.boolean("closes_a_position").notNullable()

      // date the order was filled on
      table.datetime("order_filled_date", options={useTz: false})//.defaultTo(new Date(Date.now()).toDateString())
      
      // id of the bot this order is for
      table.integer("bot_id").unsigned().notNullable()
      table.foreign("bot_id")
        .references("id")
        .inTable("stock_bots")
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("stock_orders")
};
