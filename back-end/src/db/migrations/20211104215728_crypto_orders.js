// on order creation, the order information will be put here

exports.up = function(knex) {
  return knex.schema.createTable("crypto_orders", (table) => {
      // order ID
      table.increments("crypto_order_id").primary()

      // buy side or sell side
      table.string("side").notNullable()

      // price it is buying or selling 
      table.decimal("price", null).unsigned().notNullable()

      // for buy orders, this is how much of the crypto will be purchased
      // for sell orders, this is how much crypto will be sold
      table.decimal("base_crypto_amount", null).unsigned().notNullable()

      // for buy orders, this is how much of the quote crypto is being used in the order
      // for sell orders, this is how much of the quote crypto you will receive if filled
      table.decimal("quote_crypto_amount", null).unsigned().notNullable()

      // quote profit if the order is filled
      // only applies to sell orders closing out a long, or buy orders closing out a short
      // AKA if the order closes out a trade
      table.decimal("quote_profit_amount", null).defaultTo(null)

      // base profit if the order is filled
      // only applies to sell orders closing out a long, or buy orders closing out a short
      table.decimal("base_profit_amount", null).defaultTo(null)

      // base profit if the order is filled
      // order ID on the exchange
      table.integer("exchange_order_id").unsigned().notNullable()

      // strategy these orders are for
      table.string("strategy").notNullable()

      // type of the order (GTC, OCO, etc)
      table.string("order_type").notNullable()

      // status of the order (placed, partially filled, filled, cancelled)
      table.string("status").notNullable()

      // if order is partially filled, show amount partially filled
      table.decimal("partial_fill_amount", null).defaultTo(0)

      // string of what happens if the order is filled
      // option: "trade opened", "trade closed", "trade stopped out"
      table.string("trade_status_if_filled").notNullable()

      // date the order was filled on
      table.datetime("order_filled_date", options={useTz: false})//.defaultTo(new Date(Date.now()).toDateString())
      
      // corresponding bot id the trade belongs to
      table.integer("bot_id").unsigned().notNullable()
      table
        .foreign("bot_id")
        .references("id")
        .inTable("crypto_bots")
        .onDelete("CASCADE")      
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("crypto_orders")
};
