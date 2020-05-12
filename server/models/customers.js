'use strict'

const Model = require('objection').Model

class customers extends Model {

  static get tableName () {
    return 'customers'
  }
  static getAllCustomers(){
    return customers.query().select("*").withGraphFetched ('[orders]').orderBy('id','desc')
  }
  static getAllCustomersNotDeleted(){
    return customers.query().select("*").where("deleted","=",false).withGraphFetched ('[orders]')
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

  static get relationMappings () {
    
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
    }
  }
}

module.exports = customers
