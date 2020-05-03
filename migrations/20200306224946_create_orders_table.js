exports.up = knex =>
  knex.schema.createTable("orders", table => {
    table.increments('id').primary()
    table.boolean("payed")
    table.boolean("cancelled")
    table.timestamp("created_at").defaultTo(knex.fn.now())
    table.integer("customer_id").references('customers.id').notNullable().onDelete('cascade')
    table.double("total_price")
});

exports.down = knex => knex.schema.dropTableIfExists("orders");