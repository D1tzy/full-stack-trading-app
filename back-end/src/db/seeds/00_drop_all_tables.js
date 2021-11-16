const tables = 
"bots, \
orders, \
trades, \
exchanges"

exports.seed = function(knex) {
  return knex.raw(`TRUNCATE TABLE ${tables} RESTART IDENTITY CASCADE`)
};
