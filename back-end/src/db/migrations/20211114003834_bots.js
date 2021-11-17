
exports.up = function(knex) {
  return knex.schema.createTable("bots", (table) => {
    // id of the bot
    table.increments("id").primary()

    // status of the bot, bots will start with a status of created and must be started manually
    // options: created, active, paused, archived
    table.string("status").notNullable().defaultTo("created")

    // market the bot is for
    // options: crypto, stock, forex
    table.string("market").notNullable()

    // derivative type the bot trades if it trades derivatives
    // options: option, future
    table.string("derivative_type")

    // strategy the bot uses
    table.string("strategy").notNullable()

    // ticker the bot will trade
    table.string("ticker").notNullable()  

    // percent goal the bot looks to gain
    // no formatting, ie; 1% is 1, 5.67% is 5.67, etc
    table.decimal("percent_profit_goal", null).unsigned().notNullable()

    // option to keep some of the profit in the asset traded
    table.decimal("take_profit_in_base_asset_percent", {scale: 2})

    // percent stop loss the bot will lock in a loss at, not required
    table.decimal("percent_stop_loss", null).unsigned()

    // percent below entry the bot will place a safety order, AKA average down,
    table.decimal("percent_safety_order", null).unsigned()

    // how many times the bot will average down
    table.integer("max_safety_orders").unsigned()

    // max leverage the bot is allowed to use
    table.integer("max_leverage").unsigned()

    // for crypto bots, this is the amount of the quote currency per trade
    // for stock and forex bots, this is dollars per trade
    table.decimal("capital_per_trade", null).unsigned()

    // amount of the asset traded to be shorted per trade
    // this value will be used if you already own the asset and want to designate a portion/all
    // of it to this bot
    table.decimal("base_per_trade", null).unsigned()

    // amount of the asset in the quote currency or dollars to be shorted per trade
    // used if you own the only the quote asset and are shorting it using a loan
    table.decimal("base_in_quote_per_trade", null).unsigned()

    // quote currency or dollars allocated to the bot
    table.decimal("capital_allocated", null).unsigned()

    // base asset allocated to the bot if it goes short
    table.decimal("asset_amount_allocated", null).unsigned()

    // datetime the bot was started
    // will be null if datetime_paused is not null
    table.datetime("datetime_started", {usetz: false, precision: 6})

    // datetime the bot was paused
    // will be null if datetime_paused is not null
    table.datetime("datetime_paused", {usetz: false, precision: 6})

    // hours the bot has been active
    table.integer("hours_active")

    // total net quote currency or dollars gained through all trades
    table.decimal("lifetime_quote_profit", null).unsigned().defaultTo(0)

    // total base currency or asset gained through all trades
    table.decimal("lifetime_base_profit", null).unsigned().defaultTo(0)

    // for crypto strategies, this is the exchange id the bot should run on
    // for arbitrage strategies, this should stay null, as it will look at price data on every exchange
    // it has API keys for
    table.integer("exchange_id").unsigned()
    table.foreign("exchange_id")
        .references("id")
        .inTable("exchanges")
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable("bots")
};
