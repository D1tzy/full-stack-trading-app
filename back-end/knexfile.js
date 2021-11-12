// Update with your config settings.
require('dotenv').config()
const path = require("path")

const {
  //DATABASE_URL = "postgresql://postgres@localhost/postgres",
  DATABASE_URL_DEVELOPMENT = "postgres://katvpqir:zXEGk_EPr7UEMkaj8RPoybK82Qw0oXr-@fanny.db.elephantsql.com/katvpqir",
  //DATABASE_URL_TEST = "postgres://afmvumro:KyQ_G7To5Y3S4XGZ0xv8shkI3WdCILt_@chunee.db.elephantsql.com/afmvumro",
  //DATABASE_URL_PREVIEW = "postgresql://postgres@localhost/postgres",
  DEBUG,
} = process.env;

module.exports = {

  development: {
    client: "postgresql",
    pool: { min: 1, max: 5 },
    connection: DATABASE_URL_DEVELOPMENT,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    debug: !!DEBUG,
  },

  /* staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }, */

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
