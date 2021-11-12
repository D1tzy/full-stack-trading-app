
exports.up = function(knex) {
    return knex.schema.createTable("crypto_bots", (table) => {
        // ID for the bot
        table.increments("id").primary()

        // strategy of the bot
        table.string("strategy").notNullable()

        // the pair the bot trades
        table.string("ticker").notNullable()

        // Status: active, inactive, archived, created
        // new bots will start with a status of created and must be manually started
        table.string("status").notNullable().defaultTo("created")

        // percent profit goal per trade
        // for arbitrage strategies, the bot wont take the trade unless the arbitrage is greater than this value
        table.integer("percent_profit_goal").unsigned().notNullable()

        // amount of the quote asset to use to buy per trade
        // only applies to bots that go long
        table.decimal("quote_asset_per_trade", null)

        // amount of the base asset to sell per trade
        // only applies to bots that go short
        table.decimal("base_asset_per_trade", null)

        // alternative value to base_asset_per_trade 
        // if you want to go short based on the quote crypto instead of amount of the asset
        table.decimal("base_asset_in_quote_per_trade")

        // total quote currency the bot has access to
        // only applies to bots that go long
        table.decimal("quote_currency_allocated", null)

        // total base currency the bot has access to
        // only applies to bots that go short
        table.decimal("base_currency_allocated", null)

        // percent amount of the profit that stays in the crypto
        table.integer("take_profit_in_crypto_percent").defaultTo(0)

        // Lifetime profit in base crypto (the crypto being traded)
        table.decimal("lifetime_base_profit", null).unsigned().notNullable().defaultTo(0)

        // lifetime profit in quote crypto (usually USDT or some other stablecoin, USD, or BTC. But can be anything)
        table.decimal("lifetime_quote_profit", null).unsigned().notNullable().defaultTo(0)


        // considering writing cron jobs to calculate these values
        // would be cool to display them on the front end
        // would be hard to properly show yearly/lifetime returns with bots that were paused though
        // because I only want to show returns for time the bot was active
        // may have to think of a solution to that problem

        // yearly percent return
        //table.integer("percent_return_this_year").notNullable().defaultTo(0)
        // lifetime percent return
        //table.integer("lifetime_percent_return").notNullable().defaultTo(0)
        // average minutes every trade lasted
        //table.integer("average_minutes_per_trade").notNullable().defaultTo(0)
    })
};

exports.down = function(knex) {
  return knex.schema.dropTable("crypto_bots")
};
