'use strict'

const Model = require('objection').Model

class products extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'products'
  }
  static getProductById (id) {
    return products.query().findOne({id}).eager('[images,Category,Model,Brand]')
  }
  static async getProductByName (name) {
    const fetchData = await products.query().findOne({name}).eager('[images,Category,Model,Brand]')
    return fetchData
  }

  static async getAllProducts () {
    const fetchData = await products.query().select('*').where("deleted","=",false).eager('[images,Category,Model,Brand]') 
    return fetchData
  }

  static async createProduct (body){
    return products.query().insertAndFetch({
      name: body.name,
      description: body.description,
      brand_id: body.brand_id,
      model_id: body.model_id,
      category_id: body.category_id,
      price: body.price,
      stock: body.stock,
      deleted: false
    })
    .catch(err=>{
      return { state:"failure", error: err}
    })
  }
  static async editProduct (body,original){
    const updateProduct =  await products.query().update({
      name: body.name?body.name: original.name,
      description: body.description?body.description:original.description,
      brand_id: body.brand_id?body.brand_id:original.brand_id,
      model_id: body.model_id?body.model_id:original.model_id,
      category_id: body.category_id?body.category_id:original.category_id,
      price: body.price?body.price:original.price,
      stock: body.stock?body.stock:original.stock
    }).where("id","=",original.id).catch(e => {
      return { state: "failure", data: 'Error in edit product model' , error:e }
    })
    return products.query().findOne({id:original.id}).eager('[images,Category,Model,Brand]')
  }
  static async setDeleted(id){
    return products.query().update({
      deleted:true
    }).where("id","=",id)
  }

  static async decrementProductStock (productsArray) {
    var edits = await Promise.all([productsArray.map(async originalProduct=>{
      var decrements = await products.query().update({
        stock:originalProduct.stock-1
      }).where('id','=',originalProduct.id).andWhere("name","=",originalProduct.name)
      return decrements
    })])
    return edits
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
    const ProductImages = require('./prodcut_images')
    const category = require('./categories')
    const brand = require('./brands')
    const model = require('./models')
    return {
      images:{
        relation: Model.HasManyRelation,
        modelClass: ProductImages,
        join:{
          from: 'products.id',
          to: "product_images.product_id"
        }
      },
      Category:{
        relation: Model.HasOneRelation,
        modelClass: category,
        join:{
          from: 'products.category_id',
          to: "categories.id"
        }
      },
      Model:{
        relation: Model.HasOneRelation,
        modelClass: model,
        join:{
          from: 'products.model_id',
          to: "models.id"
        }
      },
      Brand:{
        relation: Model.HasOneRelation,
        modelClass: brand,
        join:{
          from: 'products.brand_id',
          to: "brands.id"
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

module.exports = products