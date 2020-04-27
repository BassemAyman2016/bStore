'use strict'

const Model = require('objection').Model

class product_images extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'product_images'
  }

  static getProductImagesByProductId (id) {
    return product_images.query().select("*").where("product_id","=",id).andWhere("deleted","=",false)
  }
  // static async getProductByName (name) {
  //   const fetchData = await products.query().findOne({name}) 
  //   return fetchData
  // }

  static async insertProductImages ( images_array, productId){
    var data = []
    const insertions = await Promise.all(images_array.map(async image => {
      const insert = await product_images.query().insertAndFetch({
        product_id: productId,
        img: image,
        deleted:false
      }).then(res => {
        data.push(res)
      })
      return insert
    }))
    return data
  }
  
  static async setDeleted(id){
    return product_images.query().update({
      deleted:true
    }).where("product_id","=",id)
  }
  static async deleteImageById(id){
    return product_images.query().update({
      deleted:true
    }).where("id","=",id)
  }
  static async restoreDeletedImages(product_id){
    return product_images.query().update({
      deleted:false
    }).where("product_id","=",product_id)
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

    return {
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

module.exports = product_images
