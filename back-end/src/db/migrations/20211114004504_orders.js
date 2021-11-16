
exports.up = function(knex) {
  return knex.schema.createTable("orders", (table) => {
      // ID of the order
      table.increments("id").primary
      
      // equity type, only applicable to stock orders
      // options: stock, option, future
      table.string("equity_type")

      // order id on the exchange
      table.integer("exchange_order_id").unsigned().notNullable()

      // 'side' of the order
      // options: buy or sell
      table.string("side").notNullable()

      // type of the order
      // options: market, limit
      table.string("order_type").notNullable()

      // settings of the order
      // options: GTC, IOK, OCO, etc
      table.string("order_settings").notNullable()

      // price the order was filled at
      table.decimal("fill_price", null).unsigned()

      // quote currency 
      // for buy orders, this is how much of the currency is being used to buy the asset
      // for sell orders, this is how much will be received by selling the asset
      table.decimal("quote_currency_amount", null).unsigned().notNullable()

      // base currency
      // for buy orders, this is how much of the asset will be receieved
      // for sell orders, this is how much will be sold
      // for options trades, this will be an integer of how many contracts were bought or sol
      table.decimal("base_asset_amount", null).unsigned().notNullable()

      // amount of contracts the order is for
      table.integer("contract_amount")

      // contract being traded if the bot is trading options
      table.string("option_info")

      // status of the order
      // options: active, partially filled, filled, canceled
      table.string("status")

      // amount of the order partially filled if applicable
      table.decimal("partial_fill_amount", null).unsigned()

      // date the order was created
      table.datetime("order_created_on", {useTz: false, precision: 6})

      // date the order was filled
      table.datetime("order_filled_on", {useTz: false, precision: 6})

      // date the order was canceled
      table.datetime("order_canceled_on", {useTz: false, precision: 6})

      // id of the trade the order is for
      table.integer("trade_id")
      table.foreign("trade_id")
        .references("id")
        .inTable("trades")

      // exchange the order is on
      table.uuid("exchange_id").notNullable()
      table.foreign("exchange_id")
        .references("id")
        .inTable("exchanges")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("orders")
};
