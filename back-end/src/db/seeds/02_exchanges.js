/*

exchange
api_key
private_key
secret_phrase

*/

exports.seed = function(knex) {
  return knex("exchanges").insert([
    {
    exchange: "kucoin",
    api_key: "example-api-key-2323o4h025i1n53",
    private_key: "example-private-key-2l4k26j47h86j58b9",
    secret_phrase: "super-secret-phrase"
  },
])
};
