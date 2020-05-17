
'use strict'
const Model = require('objection').Model
class products extends Model {
  static get tableName () {
    return 'products'
  }
  static getProductById (id) {
    return products.query().findOne({id}).withGraphFetched('[images,Category,Model,Brand]')
  }
  static async getProductByName (name) {
    const fetchData = await products.query().findOne({name}).withGraphFetched ('[images,Category,Model,Brand]')
    return fetchData
  }

  static async getAllProducts () {
    const fetchData = await products.query().select('*').where("deleted","=",false).withGraphFetched ('[images,Category,Model,Brand]').orderBy('id')
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
    return products.query().findOne({id:original.id}).withGraphFetched ('[images,Category,Model,Brand]')
  }
  static async setDeleted(id){
    return products.query().update({
      deleted:true
    }).where("id","=",id)
  }

  static async decrementProductStock (productsArray, options) {
    const edits = await productsArray.reduce( async (previousPromise, originalProduct) => {
      await previousPromise;
      var find = await products.query(options.trx).findOne({
        id:originalProduct.id,
      })
      var decrement = await find.$query(options.trx).updateAndFetch({
        stock:find.stock-originalProduct.count
      })
      return decrement
    }, Promise.resolve());
    return edits
    
  }

  static async restoreItems (productsArray) {
    try {
      var edits = await Promise.all([productsArray.map(async (productsCount,index)=>{
        if(productsCount){
          var find = await products.query().findOne({
            id:index,
          })
          var increment = await find.$query().updateAndFetch({
            stock:find.stock+productsCount
          })
          return increment
        }
      })])
    return edits
    } catch (error) {
      return { state:"failure",error:error}
    }
    
  }

  static get relationMappings () {
    const ProductImages = require('./prodcut_images')
    const category = require('./categories')
    const brand = require('./brands')
    const model = require('./models')
    return {
      images:{
        relation: Model.HasManyRelation,
        modelClass: ProductImages,
        filter:query=>query.select("*").where("deleted",false),
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
    }
  }
}

module.exports = products
