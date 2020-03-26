'use strict'

const Model = require('objection').Model

class orders extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'orders'
  }

  static async getAllOrders(){
    return orders.query().select('*').eager('[Customer,products]')
  }
  static async getOrderById(id){
    return orders.query().select('*').where('id',id).eager('[products]')
  }
  static async getCertainCustomerOrders(id){
    return orders.query().select('*').where("customer_id",id).eager('[products]')
  }
  static async getSingleOrder(order_id,user_id){
    return orders.query().findOne({id:order_id,customer_id:user_id}).eager('[products]')
  }
  static async createOrder(customer_id, priceSum ){
    return orders.query().insertAndFetch({
      payed:false,
      cancelled:false,
      customer_id: customer_id,
      total_price: priceSum
    })
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
  static async payOrder (order_id, customer_id){
    try {
      return orders.query().update({
      payed:true,
    }).where("id",order_id).andWhere("customer_id",customer_id)
    } catch (error) {
      console.log(error)
      return error
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

//   static async addNewAcrossCity (new_acrossCities_params, companyId, vehicles, agency_id) {
//     const insertion = await Promise.all(vehicles.map(async vehicle => {
//       var addTours = []
//       var acrossCity = await AcrossCities.query().insert({

//         price: new_acrossCities_params.price,
//         tips: new_acrossCities_params.tips,
//         overnight_cost: new_acrossCities_params.overnight_cost,
//         one_way: new_acrossCities_params.one_way,
//         agencies_transportation_companies_vehicles_id: vehicle,
//         agencies_transportation_companies_id: companyId,
//         from_city_id: new_acrossCities_params.from_city_id,
//         to_city_id: new_acrossCities_params.to_city_id,
//         agency_id: agency_id

//       }).then(res => {
//         addTours.push(res)
//       })
//       return addTours
//     }))
//     return insertion
//   }

//   static getAcrossCities (local_transportation_companies_id) {
//     return AcrossCities.query().eager('[TransportationVehicles,From_City,To_City]')
//       .where('accross_cities.local_transportation_companies_id', '=', local_transportation_companies_id).andWhere('deleted', '=', false)
//   }

  

  static get relationMappings () {
    // const transportation_companies_vehicles = require('./transportation_company_vehicle')
    // const cities = require('./city')
    // const transportationCompany = require('./local_transportation_company')
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
      // roles: {
      //   relation: Model.ManyToManyRelation,
      //   modelClass: Role,
      //   filter: query => query.select('roles.id', 'roles.name', 'agency_id').where('users_roles.deleted', '=', false),
      //   join: {
      //     from: 'roles.id',
      //     // ManyToMany relation needs the `through` object
      //     // to describe the join table.
      //     through: {
      //       // If you have a model class for the join table
      //       // you need to specify it like this:
      //       // modelClass: PersonMovie,
      //       from: 'users_roles.user_id',
      //       to: 'users_roles.role_id',
      //       extra: ['agency_id']
      //     },
      //     to: 'users.id'
      //   }
      // },
    //   TransportationVehicles: {
    //     relation: Model.HasManyRelation,
    //     modelClass: transportation_companies_vehicles,
    //     join: {
    //       from: 'agencies_accross_cities.agencies_transportation_companies_vehicles_id',
    //       to: 'agencies_transportation_companies_vehicles.id'
    //     }
    //   },
    //   From_City: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: cities,
    //     join: {
    //       from: 'agencies_accross_cities.from_city_id',
    //       to: 'cities.id'
    //     }
    //   },
    //   To_City: {
    //     relation: Model.BelongsToOneRelation,
    //     modelClass: cities,
    //     join: {
    //       from: 'agencies_accross_cities.to_city_id',
    //       to: 'cities.id'
    //     }
    //   }
    }
  }
}

module.exports = orders
