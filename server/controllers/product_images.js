const ProductModel = require('../models/products')
const AdminModel = require('../models/admins')
const ProductImagesModel = require('../models/prodcut_images')
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