// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const Category = require('../models/Category')
const Admin = require('../models/Admin')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const createCategory =  async function (req, res) {
    var valid_params = req.body && req.body.name
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'category name is missing' });
    }
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    const categoryCreation = await Category.create(req.body)
    if(categoryCreation){
        res.status(200).send({ status: 'success', msg: 'category created successfully', data: categoryCreation })
    }else{
        res.status(422).send({ status: 'failure', message: 'creation of category Failed' });
    }
}

module.exports = {
    createCategory
}