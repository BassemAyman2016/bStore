const knex_migration_table_name = 'knex_migrations'
const migrations_folder = `${__dirname}/../migrations`
const seeds_folder = `${__dirname}/../seeds`
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
    connection: process.env.DATABASE_URL,
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
