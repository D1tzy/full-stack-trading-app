// when an order is filled, the trade information will be put here

exports.up = function(knex) {
    return knex.schema.createTable("crypto_trades", (table) => {
        // trade ID
        table.increments("crypto_trade_id").primary()

        // long or short or neutral if arbitrage
        table.string("position").notNullable().defaultTo("long")

        // amount of crypto purchased or shorted
        // this is the base crypto
        table.decimal("position_size", null).unsigned().notNullable()

        // price the order was filled at
        table.decimal("filled_price", null).unsigned().notNullable()

        // amount of base crypto in the trade
        // for long positions this is the amount purchased
        // for short positions this is the amount sold
        table.integer("base_crypto_in_trade").unsigned().notNullable()

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
          .inTable("crypto_bots")
          .onDelete("CASCADE")
          
        // corresponde order id that would close the trade
        table.integer("closing_trade_id").defaultTo(null)
        table.foreign("closing_trade_id")
          .references("crypto_order_id")
          .inTable("crypto_orders")
          .onDelete("CASCADE")
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTable("crypto_trades")
  };