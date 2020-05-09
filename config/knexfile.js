const knex_migration_table_name = 'knex_migrations'
const migrations_folder = `${__dirname}/../migrations`
const seeds_folder = `${__dirname}/../seeds`
// const pg = require('pg')
// pg.defaults.ssl = true;
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
module.exports = {
  development: {
    client: 'pg',
    connection: {
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      charset: 'utf-8',
      timezone: 'utc'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: knex_migration_table_name,
      directory: migrations_folder
    },
    seeds: {
      directory: seeds_folder
    },
    acquireConnectionTimeout: 1000, // TODO findout if this is seconds or ms
    // debug: true
  },
  production: {
    client: 'pg',
    connection: "postgres://fweudelorjsxpz:86941b58f432160aa41fdc2c205777b812ba6a89316214425017d5f044294394@ec2-46-137-84-173.eu-west-1.compute.amazonaws.com:5432/d7hj8vms2ot9kn",
    ssl:true,
    pool: {
      min: 2, // TODO might want to increase but based on the instance
      max: 10
    },
    migrations: {
      tableName: knex_migration_table_name,
      directory: migrations_folder
    },
    seeds: {
      directory: seeds_folder
    }
  }
}
