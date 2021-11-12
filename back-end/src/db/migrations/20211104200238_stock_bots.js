
exports.up = function(knex) {
    return knex.schema.createTable("stock_bots", (table) => {
        // bot id
        table.increments("id").primary()

        // strategy
        table.string("strategy").notNullable()

        // ticker the bot trades
        table.string("ticker").notNullable()

        // status of the bot: active, inactive, archived, created
        table.string("status").notNullable().defaultTo("active")

        // market the bot trades: stock, option, future
        table.string("equity_type").notNullable().defaultTo("stock")

        // percent profit goal for each trade
        table.integer("percent_profit_goal").unsigned().notNullable()

        // dollars per trade
        // only applies to bots that go long
        table.integer("capital_per_trade").defaultTo(null)

        // total dollars allocated to this bot
        // only applies to bots that go long
        table.integer("capital_allocated").defaultTo(null)

        // amount of the asset to use per trade short
        // only applies to bots that go short
        table.integer("capital_per_short_trade").defaultTo(null)

        // amount of the asset allocated to this bot to be used short
        table.decimal("capital_allocated_short").defaultTo(null)

        // option to keep percent of the profit in the asset
        // only applies to non-derivative trades (stocks commodities etc, NOT futures or options etc)
        // most likely used on penny stocks or FX markets should I bring that compatability in
        // can be used on anything with fractional shares pretty effectively with low capital as well
        table.integer("take_profit_in_asset_percent").defaultTo(0)

        // lifetime profit in dollars
        table.decimal("lifetime_profit", 100, 2).defaultTo(0)

        // amount of free assets gained by taking profit in the asset
        table.decimal("lifetime_assets_gained", null).defaultTo(0)



        // yearly percent return
        //table.integer("percent_return_this_year").notNullable().defaultTo(0)
        // lifetime percent return
        //table.integer("lifetime_percent_return").notNullable().defaultTo(0)
        // average minutes every trade lasted
        //table.integer("average_minutes_per_trade").notNullable().defaultTo(0)
    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTable("stock_bots")
};
