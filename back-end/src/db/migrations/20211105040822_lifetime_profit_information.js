
exports.up = function(knex) {
    return knex.schema.createTable("lifetime_profit_information", (table) => {
        // completed_trade_id (primary)
        table.increments("completed_trade_id").primary()

        // strategy used for the trade
        table.string("strategy").notNullable()

        // market (stock or crypto (or forex))
        table.string("market").notNullable()

        // pairing/asset for the trade
        table.string("ticker")

        // long or short
        table.string("position")

        // position size in base or asset
        table.decimal("position_size", null).unsigned().notNullable()

        // position size in quote or dollars
        table.decimal("buy_size")

        // percent profit
        table.decimal("percent_profit", null).notNullable()

        // profit in base/asset
        table.decimal("asset_profit", null).notNullable().defaultTo(0)

        // profit in quote/dollars
        table.decimal("quote_profit", null).notNullable()

        // margin or leverage used (boolean)
        table.boolean("leverage_used").defaultTo(false)

        // option or other derivative (boolean)
        table.boolean("is_derivative").defaultTo(false)

        // date trade opened
        table.datetime("trade_start_date", options={useTz: false})

        // date trade closed
        table.datetime("trade_end_date", options={useTz: false})//.defaultTo(new Date(Date.now()).toDateString())
        
        // time in trade (string formated 'x months, x weeks, x days, x hours, x minutes, x seconds)
        table.string("time_in_trade").notNullable()
        
        // bot id (cant be a foreign key since we have a table for crypto bots and one for stock bots)
        table.integer("bot_id").unsigned().notNullable()

        // trade id (string of the trade id + ' stock/crypto')
        table.string("trade_id").unsigned().notNullable()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("lifetime_profit_information")
};
