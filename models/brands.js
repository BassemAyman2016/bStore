'use strict'

const Model = require('objection').Model

class brands extends Model {

  static get tableName () {
    return 'brands'
  }
  static async getBrandById(id) {
    return brands.query().findOne({id})
  }
  static async getByName(body) {
    return brands.query().findOne({name:body.name})
  }
  static createBrand (body) {
    return brands.query().insertAndFetch({
      name: body.name
    })
    .catch(err=>{
      return { state:"failure", error: err}
    })
  }
  static async setDeleted(id){
    return brands.query().update({
      deleted:true
    }).where("id","=",id)
  }
  static async getAllBrands(){
    return brands.query().select("*").where('deleted','=',false).orderBy('id',"desc")
  }
  static get relationMappings () {
    return {
    }
  }
}

module.exports = brands
