exports.up = knex =>
  knex.schema.createTable("product_images", table => {
    table.increments('id').primary()
    table.integer("product_id").references('products.id').notNullable().onDelete('cascade')
    table.string("img", 500)
    table.boolean("deleted")
});

exports.down = knex => knex.schema.dropTableIfExists("product_images");