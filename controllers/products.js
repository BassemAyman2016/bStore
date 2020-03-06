const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const Product = require('../models/Product')
const Admin = require('../models/Admin')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const createProduct =  async function (req, res) {
    var valid_params = req.body &&
    req.body.name && req.body.description && req.body.brand && req.body.model &&
    req.body.price && req.body.category_id && req.body.stock && req.body.images
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Product creation paramters are missing' });
    }else{
        const name = req.body.name
        const findIfProductWithSameNameExists = await Product.findOne({ 'name': name });
        if(findIfProductWithSameNameExists){
            return res.status(400).send({ status: 'failure', message: 'Product already exists' })
        }else{
            const newProduct = await Product.create(req.body);
            if(newProduct){
                return res.status(200).send({ status: 'success', msg: 'Product created successfully', data: newProduct });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while creating product' })
            }
        }
    }
}
const getAllProducts = async function (req, res) {
    const allProducts = await Product.find().populate('category_id')
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
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
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
    console.log("editObject",editObject)
    const findProduct = await Product.findOne({_id:product_id})
    if(!findProduct){
        return res.status(400).send({ status: 'failure', message: 'Product not found' })
    }
    try{
        const updateProduct = await Product.findOneAndUpdate( {_id:product_id} , editObject)
        if(updateProduct){
            return res.status(200).send({ status: 'success', msg: 'Product edited successfully', data: updateProduct });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while updating product info' })
        }   
    }catch(e){
        console.log(e)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while editing product' })
    }
}
const deleteProduct =  async function (req, res) {
    var valid_params = req.params
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
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
            const findIfProductExists = await Product.findOne({ '_id': product_id });
            if(findIfProductExists){
            const productDeleted = await Product.findOneAndDelete({_id:product_id})
            if(productDeleted){
                    return res.status(200).send({ status: 'success', msg: 'Product deleted successfully', data: productDeleted });
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
module.exports = {
    createProduct,
    getAllProducts,
    editProduct,
    deleteProduct
}