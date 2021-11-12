
exports.seed = function(knex) {
  return knex("stock_bots").insert([
    {
    strategy: "gap_fill",
    ticker: "AAPL",
    percent_profit_goal: 5,
    capital_per_trade: 20,
    capital_allocated: 100
  },
])
};
