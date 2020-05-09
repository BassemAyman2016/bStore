'use strict'

const Model = require('objection').Model

class order_products extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'order_products'
  }

  static async insertProducts(products,order, options){
    const productInsertions = await Promise.all(products.map(async singleProduct=>{
      var holder = []
      for(var i=0; i < singleProduct.count ; i++){
        const singleInsertion = await order_products.query(options.trx).insertAndFetch({
          order_id:order.id,
          product_id:singleProduct.id
        }).then(res=>{
          holder.push(res)
        })
      }
      return holder
    }))
    return productInsertions
  }

  static async getOrderProducts(order_id){
    return order_products.query().select("product_id").where("order_id",order_id).withGraphFetched ('[product]')
  }

  static async fillOrdersProducts (customersData) {
    const fill = await Promise.all( customersData.map(async customer=>{
      const ordersFill = await Promise.all(customer.orders.map(async order=>{
        const data = await order_products.query().select('*').where('order_id',order.id).withGraphFetched ('[productData]')
        .then(res=>{
          order.products = res
        })
        return order
      }))
      return customer
    }))
    return fill
  }  

  static get relationMappings () {
    const Product = require('./products')
    return {
      product:{
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join:{
          from:'order_products.product_id',
          to:'products.id'
        }
      },
      productData:{
        relation: Model.BelongsToOneRelation,
        modelClass: Product,
        join:{
          from:'order_products.product_id',
          to:'products.id'
        }
      }
    }
  }
}

module.exports = order_products
