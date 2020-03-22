const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const AdminModel = require('../models/admins')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const adminSighUp =  async function (req, res) {
    var valid_params = req.body &&
    req.body.first_name && req.body.last_name && req.body.email && req.body.password 
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Signup Paramters are missing' });
    }else{
        const email = req.body.email
        const findEmailAlreadyExists = await AdminModel.getAdminByEmail(email)
        if(findEmailAlreadyExists){
            return res.status(400).send({ status: 'failure', message: 'Email Already Exists' })
        }else{
            const encrypted = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, encrypted);
            req.body.password = hashedPassword
            const newAdmin = await AdminModel.createAdmin(req.body)
            if(newAdmin){
                res.status(200).send({ status: 'success', message: 'User created successfully', data: newAdmin });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while creating admin' })
            }
        }
    }
}
const adminDeleteCustomer = async (req,res) => {
    const valid_params = req.params
        if(!valid_params){
            return res.status(400).send({ status: 'failure', message: 'Edit Paramters are missing' });    
        }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const deleteCustomerProfile = await CustomerModel.deleteCustomer(req.params.user_id);
        if(deleteCustomerProfile){
            return res.status(200).send({ status: 'success', data: deleteCustomerProfile });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching deleting customer' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while deleting customers' })
    }
}

module.exports = {
    adminSighUp,
    adminDeleteCustomer
}