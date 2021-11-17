/* 

id
status
market
derivative_type
strategy
ticker
percent_profit_goal
take_profit_in_base_asset_percent
percent_stop_loss
percent_safety_order
max_safety_orders
max_leverage
capital_per_trade
base_per_trade
base_in_quote_per_trade
capital_allocated
asset_amount_allocated

*/

exports.seed = function(knex) {
  return knex("bots").insert([
    {
      market: "crypto",
      strategy: "market-maker",
      ticker: "btcusdt",
      percent_profit_goal: 2,
      take_profit_in_base_asset_percent: 50,
      percent_safety_order: 1,
      max_safety_orders: 100,
      capital_per_trade: 50,
      capital_allocated: 5000,
  },
  {
    status: "paused",
    market: "crypto",
    strategy: "parabolic-sar",
    ticker: "shibusdt",
    percent_profit_goal: 10,
    percent_stop_loss: 5,
    take_profit_in_base_asset_percent: 25,
    capital_per_trade: 20,
    base_per_trade: 250000,
    capital_allocated: 2000,
    asset_amount_allocated: 25000000,
  },
  // this is an example of what the delta neutral options strategy would look like
  // when it finds a contract it likes (parameters for this will bespecified in the CRON job) it sells 100$ of it
  // then it will try to buy them back for 80, but will buy them back automatically if the premiums rise to 120$  
  {
    market: "stock",
    derivative_type: "option",
    strategy: "delta neutral",
    ticker: "AAPL",
    percent_profit_goal: 20,
    percent_stop_loss: 10,
    base_in_quote_per_trade: 100
  }
  ])};
