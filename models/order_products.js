'use strict'

const Model = require('objection').Model

class order_products extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'order_products'
  }

  static async insertProducts(products,order){
    const productInsertions = await Promise.all([products.map(async singleProduct=>{
      var holder = []
      for(var i=0; i < singleProduct.count ; i++){
        const singleInsertion = await order_products.query().insertAndFetch({
          order_id:order.id,
          product_id:singleProduct.id
        }).then(res=>{
          holder.push(res)
        })
      }
      return holder
    })])
    return productInsertions
  }

  static async getOrderProducts(order_id){
    return order_products.query().select("product_id").where("order_id",order_id).eager('[product]')
  }

  static async fillOrdersProducts (customersData) {
    const fill = await Promise.all( customersData.map(async customer=>{
      const ordersFill = await Promise.all(customer.orders.map(async order=>{
        const data = await order_products.query().select('*').where('order_id',order.id).eager('[productData]')
        .then(res=>{
          order.products = res
        })
        return order
      }))
      return customer
    }))
    return fill
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
    //   TransportationCompany: {
    //     relation: Model.HasManyRelation,
    //     modelClass: transportationCompany,
    //     join: {
    //       from: 'agencies_accross_cities.agencies_transportation_companies_id',
    //       to: 'agencies_transportation_companies.id'
    //     }
    //   },
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

module.exports = order_products