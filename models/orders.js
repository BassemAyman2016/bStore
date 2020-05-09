'use strict'

const Model = require('objection').Model

class orders extends Model {

  static get tableName () {
    return 'orders'
  }

  static async getAllOrders(){
    return orders.query().select('*').withGraphFetched ('[Customer,products]').orderBy('id','desc')
  }
  static async getOrderById(id){
    return orders.query().select('*').where('id',id).withGraphFetched ('[products]')
  }
  static async getCertainCustomerOrders(id){
    return orders.query().select('*').where("customer_id",id).withGraphFetched ('[products]').orderBy('id','desc')
  }
  static async getSingleOrder(order_id,user_id){
    return orders.query().findOne({id:order_id,customer_id:user_id}).withGraphFetched ('[products]')
  }
  static async createOrder(customer_id, priceSum, paymentIntent, options ){
    var isnertions = await orders.query(options.trx).insertAndFetch({
      paid:false,
      cancelled:false,
      customer_id: customer_id,
      total_price: priceSum,
      payment_intent:paymentIntent
    })
    return isnertions
  }
  static async cancelOrder (order_id, customer_id){
    try {
      return orders.query().update({
      cancelled:true,
    }).where("id",order_id).andWhere("customer_id",customer_id)
    } catch (error) {
      console.log(error)
      return error
    }
  }
  static async payOrder (order_id, customer_id, options={}){
    if(options.trx){
      try {
        return orders.query(options.trx).update({
        paid:true,
      }).where("id",order_id).andWhere("customer_id",customer_id)
      } catch (error) {
        console.log(error)
        return error
      }
    }else{
      try {
        return orders.query().update({
        paid:true,
      }).where("id",order_id).andWhere("customer_id",customer_id)
      } catch (error) {
        console.log(error)
        return error
      }
    }
      
  }
  static async adminCancelOrder (order_id){
    try {
      return orders.query().update({
      cancelled:true,
    }).where("id",order_id)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static get relationMappings () {
    const Product = require('./products')
    const Customer = require('./customers')
    return {
      products:{
        relation: Model.ManyToManyRelation,
        modelClass: Product,
        join:{
          from:'products.id',
          through: {
            from:'order_products.order_id',
            to:'order_products.product_id'
          },
          to:'orders.id'
        }
      },
      Customer:{
        relation: Model.HasOneRelation,
        modelClass: Customer,
        join:{
          from:'orders.customer_id',
          to:'customers.id'
        }
      }
    }
  }
}

module.exports = orders
