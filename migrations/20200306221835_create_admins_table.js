exports.up = knex =>
  knex.schema.createTable("admins", table => {
    table.increments('id').primary()
    table.string("email", 100)
    table.string("password", 100)
    table.string("first_name", 100)
    table.string("last_name", 100)
  });

exports.down = knex => knex.schema.dropTableIfExists("admins");