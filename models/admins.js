'use strict'

const Model = require('objection').Model

class admins extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'admins'
  }
  static getAdminById (id) {
    return admins.query().findOne({id})
  }
  static async getAdminByEmail (email) {
    const fetchData = await admins.query().findOne({email: email}) 
    return fetchData
  }
  static async getAdminByResetToken (token) {
    return admins.query().findOne({reset_token: token})
  }
  static async createAdmin(body) {
    return admins.query().insertAndFetch({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      password: body.password
    }).catch(e => {
        console.log(e)
        return { message: false, data: 'Data Corrupted or might have duplicates' }
      })
  }
  static async insertResetToken(email,token){
    var find = await admins.query().findOne({
      email
    })
    var insert = await find.$query().updateAndFetch({
      reset_token:token
    })
    return insert
  }
  static async updatePassword(id,newPassword){
    var find = await admins.query().findOne({
      id
    })
    var insert = await find.$query().updateAndFetch({
      reset_token:null,
      password:newPassword
    })
    return insert
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

module.exports = admins