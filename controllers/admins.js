const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const Admin = require('../models/Admin')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const adminSighUp =  async function (req, res) {
    // const categoryCreation = await Category.create(req.body)
    // if(categoryCreation){
    //     res.status(200).send({ status: 'success', msg: 'category created successfully', data: categoryCreation })
    //     console.log(categoryCreation)
    // }else{
    //     console.log(e)
    //     res.status(422).send({ status: 'failure', message: 'creation of category Failed' });
    // }
    var valid_params = req.body &&
    req.body.first_name && req.body.last_name && req.body.email && req.body.password 
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Signup Paramters are missing' });
    }else{
        const email = req.body.email
        const findEmailAlreadyExists = await Admin.findOne({ 'email': email });
        if(findEmailAlreadyExists){
            return res.status(400).send({ status: 'failure', message: 'Email Already Exists' })
        }else{
            const encrypted = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, encrypted);
            const newAdmin = await Admin.create(
                {
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    password: hashedPassword
                }
            );
            if(newAdmin){
                res.status(200).send({ status: 'success', msg: 'User created successfully', data: newAdmin });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while creating admin' })
            }
        }
    }
}

module.exports = {
    adminSighUp
}