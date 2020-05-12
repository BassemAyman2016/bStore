'use strict'

const Model = require('objection').Model

class categories extends Model {

  static get tableName () {
    return 'categories'
  }
  static async getCategoryById(id) {
    return categories.query().findOne({id})
  }
  static async getByName(body) {
    return categories.query().findOne({name:body.name})
  }
  static createCategory (body) {
    return categories.query().insertAndFetch({
      name: body.name
    })
    .catch(err=>{
      return { state:"failure", error: err}
    })
  }
  static async setDeleted(id){
    return categories.query().update({
      deleted:true
    }).where("id","=",id)
  }
  static async getAllCategories(){
    return categories.query().select('*').where('deleted','=',false).orderBy('id','desc')
  }

  

  static get relationMappings () {
    return {}
  }
}

module.exports = categories
