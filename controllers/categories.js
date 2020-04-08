// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const CategoryModel = require('../models/categories')
const AdminModel = require('../models/admins')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const createCategory =  async function (req, res) {
    var valid_params = req.body && req.body.name
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'category name is missing' });
    }
    // const checkIfAdmin = await AdmAdminin.findOne({ _id : req.id })
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const checkIfCategoryExists = await CategoryModel.getByName(req.body)
    if(checkIfCategoryExists){
        return res.status(403).send({ status: 'failure', message: 'Category already exists' });
    }
    const categoryCreation = await CategoryModel.createCategory(req.body)
    if(categoryCreation && !categoryCreation.state){
        res.status(200).send({ status: 'success', message: 'category created successfully', data: categoryCreation })
    }else{
        res.status(422).send({ status: 'failure', message: 'creation of category Failed' });
    }
}
const deleteCategory =  async function (req, res) {
    var valid_params = req.params && req.params.category_id
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'category name is missing' });
    }
    const category_id = req.params.category_id
    // const checkIfAdmin = await AdmAdminin.findOne({ _id : req.id })
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const checkIfCategoryExists = await CategoryModel.getCategoryById(category_id)
    if(!checkIfCategoryExists){
        return res.status(403).send({ status: 'failure', message: 'Category does not exist' });
    }
    const categoryDeletion = await CategoryModel.setDeleted(category_id)
    if(categoryDeletion){
        res.status(200).send({ status: 'success', message: 'category created successfully', data: categoryDeletion })
    }else{
        res.status(422).send({ status: 'failure', message: 'deletion of category Failed' });
    }
}
const getCategories =  async function (req, res) {
    
    const fetchBrands = await CategoryModel.getAllCategories()
    if(fetchBrands){
        res.status(200).send({ status: 'success',  data: fetchBrands })
    }else{
        res.status(422).send({ status: 'failure', message: 'error while fetching categories' });
    }
}

module.exports = {
    createCategory,
    deleteCategory,
    getCategories
}