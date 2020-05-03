const ProductModel = require('../models/products')
const AdminModel = require('../models/admins')
const ProductImagesModel = require('../models/prodcut_images')
const BrandModel = require('../models/brands')
const ModelModel = require('../models/models')
const CategoryModel = require('../models/categories')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const deleteProductImages =  async function (req, res) {
    var product_id = req.params.product_id

    if(!product_id){
        return res.status(400).send({ status: 'failure', message: 'Product images deletion paramters are missing' });
    }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const checkIfProductExists = await ProductModel.getProductById(product_id)
    if(!checkIfProductExists){
        return res.status(403).send({ status: 'failure', message: 'Product does not exist' });
    }
    if(checkIfProductExists.deleted){
        return res.status(403).send({ status: 'failure', message: 'Product is already deleted' });
    }
    const deleteALLProductImages = await ProductImagesModel.setDeleted(product_id);
    if(deleteALLProductImages){
        return res.status(200).send({ status: 'success', message: 'Product images deleted successfully' });
    }else{
        return res.status(400).send({ status: 'failure', message: 'Error occured while deleting images' })
    }
    
}
const getAllProducts = async function (req, res) {
    const allProducts = await ProductModel.getAllProducts()
    if(allProducts){
        return res.status(200).send({ status:"succes", data:allProducts })
    }else{
        return res.status(400).send({ status: 'failure', message: 'error occured' })
    }
}
const editProduct = async function (req, res) {
    var valid_params = req.body
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Product editing paramters are missing' });
    }
    var product_id = req.params.product_id
    if(!product_id){
        return res.status(400).send({ status: 'failure', message: 'no product selected' });
    }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const editObject = {}
    if(req.body.name) editObject.name = req.body.name
    if(req.body.description) editObject.description = req.body.description
    if(req.body.brand) editObject.brand = req.body.brand
    if(req.body.model) editObject.model = req.body.model
    if(req.body.price) editObject.price = req.body.price
    if(req.body.category_id) editObject.category_id = req.body.category_id
    if(req.body.stock) editObject.stock = req.body.stock
    if(req.body.images) editObject.images = req.body.images 
    // console.log("editObject",editObject)
    const findProduct = await ProductModel.getProductById(product_id)
    if(!findProduct){
        return res.status(400).send({ status: 'failure', message: 'Product not found' })
    }
    try{
        const updateProduct = await ProductModel.editProduct(editObject, findProduct)
        if(updateProduct && !updateProduct.state){
            return res.status(200).send({ status: 'success', message: 'Product edited successfully', data: updateProduct });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while updating product info' , err:updateProduct })
        }   
    }catch(e){
        console.log(e)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while editing product' })
    }
}
const deleteProduct =  async function (req, res) {
    var valid_params = req.params
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Product deletion paramters are missing' });
    }else{
        var product_id = req.params.product_id
        if(!product_id){
            return res.status(400).send({ status: 'failure', message: 'no product selected' });
        }
        try {
            const findIfProductExists = await ProductModel.getProductById(product_id)
            if(findIfProductExists){
                const productDeleted = await ProductModel.setDeleted(product_id)
                if(productDeleted){
                    const deleteProductImages = await ProductImagesModel.setDeleted(product_id)
                    if(deleteProductImages){
                        return res.status(200).send({ status: 'success', message: 'Product deleted successfully', data: productDeleted });
                    }else{
                        return res.status(400).send({ status: 'failure', message: 'Error while deleting product images' })
                    }
                }else{
                    return res.status(400).send({ status: 'failure', message: 'Error while deleting product info' })
                } 
            }
        } catch (error) {
            console.log(error)
            return res.status(400).send({ status: 'failure', message: 'Error while deleting product info' })
        }
        
    }
}
const insertProductImage = async function(req,res) {
        var product_id = req.params.product_id
        var imageContainer = req.body.img
        if(!product_id || !imageContainer){
            return res.status(400).send({ status: 'failure', message: 'Product image insertion paramters are missing' });
        }
        const checkIfAdmin = await AdminModel.getAdminById(req.id)
        if(!checkIfAdmin){
            return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
        }
        const checkIfProductExists = await ProductModel.getProductById(product_id)
        if(!checkIfProductExists){
            return res.status(403).send({ status: 'failure', message: 'Product does not exist' });
        }
        if(checkIfProductExists.deleted){
            return res.status(403).send({ status: 'failure', message: 'Product is already deleted' });
        }
        if(typeof imageContainer == "string"){
            const insertSingleImage = await ProductImagesModel.insertProductImages([imageContainer],product_id)
            if(!insertSingleImage){
                return res.status(403).send({ status: 'failure', message: 'Error in image insertion' });
            }
        }
        if(imageContainer instanceof Array){
            const insertMultipleImages = await ProductImagesModel.insertProductImages(imageContainer,product_id)
            if(!insertMultipleImages){
                return res.status(403).send({ status: 'failure', message: 'Error in image insertions' });
            }
        }
        return res.status(200).send({ status: 'success', message: 'Product images inserted successfully' })      
    
}
const deleteSingleImage = async function(req,res) {
    var image_id = req.params.image_id
    if(!image_id ){
        return res.status(400).send({ status: 'failure', message: 'Image deletion paramters are missing' });
    }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const deleteImage = await ProductImagesModel.deleteImageById(image_id)
    if(deleteImage){
        return res.status(200).send({ status: 'success', message: 'Product image deleted successfully' })      
    }else{
        return res.status(400).send({ status: 'failure', message: 'Error while deleting product image' })
    }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error while deleting product image' })
    }
}
const restoreDeletedImages = async function(req,res) {
    var product_id = req.params.product_id
    if(!product_id){
        return res.status(400).send({ status: 'failure', message: 'Image deletion paramters are missing' });
    }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const restoreImages = await ProductImagesModel.restoreDeletedImages(product_id)
    if(restoreImages){
        return res.status(200).send({ status: 'success', message: 'Product image deleted successfully' })      
    }else{
        return res.status(400).send({ status: 'failure', message: 'Error while deleting product image' })
    }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error while deleting product image' })
    }
}
module.exports = {
    deleteProductImages,
    insertProductImage,
    deleteSingleImage,
    restoreDeletedImages
}