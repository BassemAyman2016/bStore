exports.up = knex =>
  knex.schema.createTable("categories", table => {
    table.increments('id').primary()
    table.string("name", 100)
  });

exports.down = knex => knex.schema.dropTableIfExists("categories");