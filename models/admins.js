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


  

  static get relationMappings () {
   return {
    
    }
  }
}

module.exports = admins
