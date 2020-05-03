exports.up = knex =>
  knex.schema.createTable("products", table => {
    table.increments('id').primary()
    table.string("name", 100)
    table.string("description", 3000)
    table.integer("stock")
    table.integer('category_id').references('categories.id').notNullable()
    table.integer('brand_id').references('brands.id').notNullable()
    table.integer('model_id').references('models.id').notNullable()
    table.boolean("deleted")
    table.double('price')
});

exports.down = knex => knex.schema.dropTableIfExists("products");