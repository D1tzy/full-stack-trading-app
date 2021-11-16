
exports.up = function(knex) {
  return knex.schema.createTable("trades", (table) => {
      // this table does not need a unique id because trades will never be deleted
      // if a trade needs to be 'deleted' its status will be set to canceled
      

      // id of the trade
      table.increments("id").primary()

      // status of the trade
      // options: active, completed, canceled
      table.string("status").notNullable()

      // position of the trade
      // options: long, short, neutral, arbitrage
      table.string("position").notNullable()

      // position size of the trade in the quote currency
      table.decimal("position_size_in_quote", null).unsigned()

      // position size of the trade in the asset traded or base currency
      table.decimal("position_size_in_base", null).unsigned()

      // amount of contracts purchased or sold
      // only applicable to options
      table.integer("position_size_in_contracts").unsigned()

      // string of the contract purchased or sold
      table.string("contract_traded")

      // price the opening order of the trade was filled at
      table.decimal("fill_price", null).unsigned()

      // target price of the trade
      table.decimal("target_price", null).unsigned()

      // stop loss price
      table.decimal("stop_loss_price", null).unsigned()

      // date trade was opened
      table.datetime("datetime_trade_opened", {useTz: false, precision: 6})

      // date trade was closed
      table.datetime("datetime_trade_closed", {useTz: false, precision: 6})

      // result of the trade
      // options: successful (trade closed in profit), failed (trade closed for a loss), canceled (trade manually canceled)
      table.string("result")

      // profit info of the trade in USD or the quote currency
      // can be negative if the trade was unsuccessful
      table.decimal("quote_profit", null)
      
      // profit info of the trade in the asset traded or base currency
      // can also be negative
      table.decimal("base_profit", null)

      // unique id of the bot that this trade is for
      table.uuid("bot_id").notNullable()
      table.foreign("bot_id")
        .references("id")
        .inTable("bots")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("trades")
};
