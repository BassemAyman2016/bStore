exports.up = knex =>
  knex.schema.createTable("categories", table => {
    table.increments('id').primary()
    table.string("name", 100)
    table.boolean('deleted').defaultTo(false)
  });

exports.down = knex => knex.schema.dropTableIfExists("categories");