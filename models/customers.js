'use strict'

const Model = require('objection').Model

class customers extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'customers'
  }
  static getAllCustomers(){
    return customers.query().select("*").eager('[orders]').orderBy('id','desc')
  }
  static getAllCustomersNotDeleted(){
    return customers.query().select("*").where("deleted","=",false).eager('[orders]')
  }
  static getCustomerById (id) {
    return customers.query().findOne({id})
  }
  static getCustomerByEmail (email) {
    return customers.query().findOne({email: email})
  }
  static async getCustomerByResetToken (token) {
    return customers.query().findOne({reset_token: token})
  }
  static async createCustomer(body) {
    return customers.query().insertAndFetch({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password,
      address: body.address,
      phone_number: body.phone_number,
      deleted:false,
      confirmed:false
    }).catch(e => {
        console.log(e)
        return { message: false, data: 'Data Corrupted or might have duplicates' }
      })
  }
  static async viewProfile(id){
    return customers.query().findOne({id})
  }
  static async deleteCustomer(id){
    return customers.query().del().where('id',"=",id)
  }
  static async deactivateAccount(id){
    return customers.query().patchAndFetchById(id,{deleted:true})
  }
  static async confirmAccount(id){
    return customers.query().patchAndFetchById(id,{ confirmed: true})
  }
  static async updateCustomerData(id,data){
    return customers.query().patchAndFetchById(id,data)
  }
  static async insertResetToken(email,token){
    var find = await customers.query().findOne({
      email
    })
    var insert = await find.$query().updateAndFetch({
      reset_token:token
    })
    return insert
  }
  static async updatePassword(id,newPassword){
    var find = await customers.query().findOne({
      id
    })
    var insert = await find.$query().updateAndFetch({
      reset_token:null,
      password:newPassword
    })
    return insert
  }
  static async activateAccount(id){
    return customers.query().patchAndFetchById(id,{ deleted: false})
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
    const order = require('./orders')
    return {
      orders:{
        relation: Model.HasManyRelation,
        modelClass: order,
        join: {
          from: 'customers.id',
          to: 'orders.customer_id'
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

module.exports = customers
