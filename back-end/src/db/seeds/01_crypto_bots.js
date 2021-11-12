/* SCHEMA 

id
strategy
ticker
status
percent_profit_goal
quote_asset_per_trade
base_asset_per_trade
base_asset_in_quote_per_trade
base_currency_allocated
quote_currency_allocated
take_profit_in_crypto_percent

*/

exports.seed = function(knex) {
  return knex("crypto_bots").insert([
    {
    // ID
    // strategy
    strategy: "market-maker",
    // ticker
    ticker: "btcusdt",
    // status
    // percent_profit_goal
    percent_profit_goal: 1,
    // quote asset per trade
    quote_asset_per_trade: 20,
    // quote currency allocated
    quote_currency_allocated: 1000,
    // take profit in crypto percent
    take_profit_in_crypto_percent: 50
  },
  {
    strategy: "parabolic-sar",
    ticker: "shibusdt",
    status: "paused",
    percent_profit_goal: 5,
    quote_asset_per_trade: 20,
    base_asset_per_trade: 250000,
    quote_currency_allocated: 2000,
    base_currency_allocated: 25000000,
    take_profit_in_crypto_percent: 25
  }
  ])};
