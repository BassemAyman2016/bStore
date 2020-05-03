exports.up = knex =>
  knex.schema.createTable("customers", table => {
    table.increments('id').primary()
    table.string("first_name", 100)
    table.string("last_name", 100)
    table.string("address", 100)
    table.string("email", 100)
    table.string("password", 100)
    table.string("phone_number", 100)
    table.boolean("deleted")
    table.boolean("confirmed")
    table.string("reset_token", 100)
});

exports.down = knex => knex.schema.dropTableIfExists("customers");