'use strict'

const Model = require('objection').Model

class product_images extends Model {
  static get tableName () {
    return 'product_images'
  }

  static getProductImagesByProductId (id) {
    return product_images.query().select("*").where("product_id","=",id).andWhere("deleted","=",false)
  }  

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

  static get relationMappings () {
    return {
    
    }
  }
}

module.exports = product_images
