// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const BrandModel = require('../models/brands')
const AdminModel = require('../models/admins')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const createBrand =  async function (req, res) {
    var valid_params = req.body && req.body.name
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'model name is missing' });
    }
    // const checkIfAdmin = await AdmAdminin.findOne({ _id : req.id })
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const checkIfBrandExists = await BrandModel.getByName(req.body)
    if(checkIfBrandExists){
        return res.status(403).send({ status: 'failure', message: 'Model already exists' });
    }
    const brandCreation = await BrandModel.createBrand(req.body)
    if(brandCreation && !brandCreation.state){
        res.status(200).send({ status: 'success', message: 'model created successfully', data: brandCreation })
    }else{
        res.status(422).send({ status: 'failure', message: 'creation of model Failed' });
    }
}

module.exports = {
    createBrand
}