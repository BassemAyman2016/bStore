const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const Admin = require('../models/Admin')
const Customer = require('../models/Customer')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const Login =  async function (req, res) {
    // const categoryCreation = await Category.create(req.body)
    // if(categoryCreation){
    //     res.status(200).send({ status: 'success', msg: 'category created successfully', data: categoryCreation })
    //     console.log(categoryCreation)
    // }else{
    //     console.log(e)
    //     res.status(422).send({ status: 'failure', message: 'creation of category Failed' });
    // }
    var valid_params = req.body &&
    req.body.email && req.body.password 
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Login fields are missing' });
    }else{
        const { email, password } = req.body
        const checkIfAdmin = await Admin.findOne({email})
        if(!checkIfAdmin){
            const checkIfCustomer = await Customer.findOne({email})
            if(!checkIfCustomer){
                return res.status(404).send({ status: 'failure', message: 'Invalid email or password' });
            }else{
                const match = bcrypt.compareSync(password, checkIfCustomer.password);
                if(match){
                    if(checkIfCustomer.deleted){
                        return res.status(403).send({ status: 'failure', message: 'Account is currently deactivated request to activate your account through email' })
                    }else{
                        const payload = {
                            id: checkIfCustomer._id
                        }
                        const token = jwt.sign(payload, tokenKey, { expiresIn: '5h' })
                        return res.status(200).send({ status: 'success', token: `bearer ${token}`, type:'customer', id: checkIfCustomer._id })
                    
                    }
                }
            }
        }else{
            const match = bcrypt.compareSync(password, checkIfAdmin.password);
                if(match){
                    if(checkIfAdmin.deleted){
                        return res.status(403).send({ status: 'failure', message: 'Account is currently deactivated request to activate your account through email' })
                    }else{
                        const payload = {
                            id: checkIfAdmin._id
                        }
                        const token = jwt.sign(payload, tokenKey, { expiresIn: '5h' })
                        return res.status(200).send({ status: 'success', token: `bearer ${token}`, type:'admin', id: checkIfAdmin._id })
                    
                    }
                }
        }
    }
}

module.exports = {
    Login
}