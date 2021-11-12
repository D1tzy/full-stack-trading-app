const tables = 
"crypto_bots, \
stock_bots, \
crypto_orders, \
stock_orders, \
crypto_trades, \
stock_trades, \
lifetime_profit_information"

exports.seed = function(knex) {
  return knex.raw(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`)
};
