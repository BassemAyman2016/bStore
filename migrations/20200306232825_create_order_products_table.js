
exports.up = knex =>
knex.schema.createTable("order_products", table => {
  table.increments('id').primary()
  table.integer("order_id").references('orders.id').notNullable().onDelete('cascade')
  table.integer("product_id").references('products.id').notNullable().onDelete('cascade')
});

exports.down = knex => knex.schema.dropTableIfExists("order_products");