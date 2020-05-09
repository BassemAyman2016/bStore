'use strict'

const Model = require('objection').Model

class models extends Model {
  // Table name is the only required property.
  static get tableName () {
    return 'models'
  }
  static async getModelById(id) {
    return models.query().findOne({id})
  }
  static async getByName(body) {
    return models.query().findOne({name:body.name})
  }
  static createModel (body) {
    return models.query().insertAndFetch({
      name: body.name
    })
    .catch(err=>{
      return { state:"failure", error: err}
    })
  }
  static async setDeleted(id){
    return models.query().update({
      deleted:true
    }).where("id","=",id)
  }
  static async getAllModels(){
    return models.query().select('*').where('deleted','=',false).orderBy('id',"desc")
  }


  

  static get relationMappings () {
    return {}
  }
}

module.exports = models
