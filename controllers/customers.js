const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const CustomerModel = require('../models/customers')
const AdminModel = require('../models/admins')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
// const tokenKey = require('../config').secretOrKey
require('dotenv').config();

const customerSignup =  async function (req, res) {
    var valid_params = req.body &&
    req.body.first_name && req.body.last_name && req.body.email && req.body.password &&
    req.body.address && req.body.phone_number
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Signup Paramters are missing' });
    }else{
        const email = req.body.email
        const findEmailAlreadyExists = await CustomerModel.getCustomerByEmail( email );
        if(findEmailAlreadyExists){
            return res.status(400).send({ status: 'failure', message: 'Email Already Exists' })
        }else{
            const encrypted = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, encrypted);
            req.body.password=hashedPassword 
            const newCustomer = await CustomerModel.createCustomer(req.body);
            if(newCustomer){
                return res.status(200).send({ status: 'success', message: 'User created successfully', data: newCustomer });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while creating user' })
            }
        }
    }
}
const getAllCustomers = async (req,res) => {
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const allCustomers = await CustomerModel.getAllCustomersNotDeleted();
        if(allCustomers){
            return res.status(200).send({ status: 'success', data: allCustomers });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching customers' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while fetching customers' })
    }
}
const viewProfile = async (req,res) => {
    try {
        // const checkIfUserExists = await Customer.findOne({ _id : req.id }).populate('orders')
        const checkIfUserExists = await CustomerModel.viewProfile(req.id)
        if(!checkIfUserExists){
            return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
        }else{
            return res.status(200).send({status:'success' , data: checkIfUserExists})
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while fetching user information' })
    }
}
const editProfile = async (req,res) => {
    try {
        const valid_params = req.body
        if(!valid_params){
            return res.status(400).send({ status: 'failure', message: 'Edit Paramters are missing' });    
        }
        const checkIfUserExists = await Customer.findOne({ _id : req.id })
        if(!checkIfUserExists){
            return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
        }else{
            const editObject = {}
            if(req.body.first_name) editObject.first_name = req.body.first_name
            if(req.body.last_name) editObject.last_name = req.body.last_name
            if(req.body.email) editObject.email = req.body.email
            if(req.body.password){
                const encrypted = bcrypt.genSaltSync(10);
                const newPassword = bcrypt.hashSync(req.body.password, encrypted);
                editObject.password = newPassword
            }
            if(req.body.address) editObject.address = req.body.address
            if(req.body.phone_number) editObject.phone_number = req.body.phone_number
            console.log("editObject",editObject)
            const updateUserData = await Customer.findOneAndUpdate({_id: checkIfUserExists._id} , editObject)
            if(updateUserData){
                res.status(200).send({ status: 'success', message: 'Profile edited successfully', data: updateUserData });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while editing profile' })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while fetching user information' })
    }
}
const deleteCustomer = async (req,res) => {
    const valid_params = req.params
        if(!valid_params){
            return res.status(400).send({ status: 'failure', message: 'Edit Paramters are missing' });    
        }
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const deleteCustomerProfile = await Customer.findOneAndUpdate({ _id: req.params.user_id}, {deleted: true});
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
const deactivateProfile = async (req,res) => {
    const checkIfCustomerExists = await Customer.findOne({ _id : req.id , deleted:false })
    if(!checkIfCustomerExists){
        return res.status(403).send({ status: 'failure', message: 'your account is already deleted' });
    }
    try {
        const deleteCustomerProfile = await Customer.findOneAndUpdate({ _id: req.id}, {deleted: true});
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
    customerSignup,
    getAllCustomers,
    viewProfile,
    editProfile,
    deleteCustomer,
    deactivateProfile
}