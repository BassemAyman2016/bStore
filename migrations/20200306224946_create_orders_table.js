exports.up = knex =>
  knex.schema.createTable("orders", table => {
    table.increments('id').primary()
    table.string("first_name", 100)
    table.string("last_name", 100)
    table.string("address", 100)
    table.string("email", 100)
    table.string("password", 100)
    table.string("phone_number", 100)
    table.boolean("deleted")
    table.boolean("confirmed")
});

exports.down = knex => knex.schema.dropTableIfExists("orders");

//-orders ( id , payed , cancelled , payed_at , cancelled_at , customer_id , total_price )