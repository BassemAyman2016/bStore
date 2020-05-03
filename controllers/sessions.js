const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
const AdminModel = require('../models/admins')
const CustomerModel = require('../models/customers')
// const GroupUser = require('../models/GroupUser');
// const User = require('../models/User')
const tokenKey = require('../config/setup').secretOrKey
const crypto = require('crypto')
const fs = require('fs')
const EmailAdapter = require('../helpers/mailAdapter')
const path  = require('path')
require('dotenv').config();

const Login =  async function (req, res) {
    // const categoryCreation = await Category.create(req.body)
    // if(categoryCreation){
    //     res.status(200).send({ status: 'success', message: 'category created successfully', data: categoryCreation })
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
        const checkIfAdmin = await AdminModel.getAdminByEmail(email)
        if(!checkIfAdmin){
            const checkIfCustomer = await CustomerModel.getCustomerByEmail(email)
            if(!checkIfCustomer){
                return res.status(404).send({ status: 'failure', message: 'Invalid email or password' });
            }else{
                const match = bcrypt.compareSync(password, checkIfCustomer.password);
                if(match){
                    if(checkIfCustomer.deleted){
                        return res.status(403).send({ status: 'failure', message: 'Account is currently deactivated request to activate your account through email' })
                    }else{
                        if(!checkIfCustomer.confirmed){
                            return res.status(403).send({ status: 'failure', message: 'Account is currently not confirmed , please check your email' })
                        }
                        const payload = {
                            id: checkIfCustomer.id
                        }
                        const token = jwt.sign(payload, tokenKey, { expiresIn: '5h' })
                        return res.status(200).send({ status: 'success', token: `bearer ${token}`, type:'customer', id: checkIfCustomer.id })
                    
                    }
                }else{
                    return res.status(404).send({ status: 'failure', message: 'Invalid email or password' });
                }
            }
        }else{
            const match = bcrypt.compareSync(password, checkIfAdmin.password);
                if(match){
                    if(checkIfAdmin.deleted){
                        return res.status(403).send({ status: 'failure', message: 'Account is currently deactivated request to activate your account through email' })
                    }else{
                        const payload = {
                            id: checkIfAdmin.id
                        }
                        const token = jwt.sign(payload, tokenKey, { expiresIn: '5h' })
                        return res.status(200).send({ status: 'success', token: `bearer ${token}`, type:'admin', id: checkIfAdmin.id })
                    
                    }
                }else{
                    return res.status(404).send({ status: 'failure', message: 'Invalid email or password' });
                }
        }
    }
}
const requestPasswordReset =  async function (req, res) {
    var valid_params = req.body && req.body.email
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Reset Paramters are missing' });
    }else{
        const customer_email = req.body.email
        var findCustomer = await CustomerModel.getCustomerByEmail( customer_email );
        var findAdmin = null
        if(!findCustomer){
            findAdmin = await AdminModel.getAdminByEmail(customer_email)
            if(!findAdmin){
               return res.status(400).send({ status: 'failure', message: 'Incorrect email' }) 
            }
            
        }
            try {
                const token = await crypto.randomBytes(20).toString('hex')
                const frontEndLink = process.env.FRONTEND_URL
                const html = fs.readFileSync(path.resolve(__dirname, '../emails/forgetPasswordMail.html'), 'utf8').toString()
                    .replace(/\$\{token\}/g, `${frontEndLink}/resetPassword/${token}`)
                const sendMail = await EmailAdapter.send('no-reply@bStore.com', customer_email, 'Password Reset', 'reset your password', html)
                
                var flag = false
                if(findCustomer){
                    const insertResetToken = await CustomerModel.insertResetToken(customer_email,token)
                    if(insertResetToken) flag= true
                }
                if(findAdmin){
                    const insertResetToken = await AdminModel.insertResetToken(customer_email,token)
                    if(insertResetToken) flag = true
                }
                if(flag)
                    return res.status(200).send({ status: 'success', msg: 'An Email Has Been Sent To You To Reset Your Password' });
                else
                    return res.status(400).send({ status: 'failure', message: 'Error while creating password reset token' })
  
            } catch (error) {
                console.log(error)
                return res.status(401).send({ status: 'failure', message: 'Error while creating password reset token' })
            }
            
        
    }
}
const resetPassword =  async function (req, res) {
    var valid_params = req.params && req.params.token && req.body && req.body.password
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Reset Paramters are missing' });
    }else{
        const resetToken = req.params.token
        const findCustomer = await CustomerModel.getCustomerByResetToken( resetToken );
        var findAdmin = null
        if(!findCustomer){
            findAdmin = await AdminModel.getAdminByResetToken(resetToken)
            if(!findAdmin)
                return res.status(400).send({ status: 'failure', message: 'There is no active password reset ticket for this account' })
        }
            try {
                const encrypted = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(req.body.password, encrypted);
                var flag = false
                if(findCustomer){
                    const updateCustomer = await CustomerModel.updatePassword(findCustomer.id,hashedPassword)
                    if(updateCustomer) flag=true
                }
                if(findAdmin){
                    const updateAdmin = await AdminModel.updatePassword(findAdmin.id,hashedPassword)
                    if(updateAdmin) flag=true
                }
                if(flag)
                    return res.status(200).send({ status: 'success', message: 'Password updated successfully' });
                else
                    return res.status(400).send({ status: 'failure', message: 'Error while updating password' })
  
            } catch (error) {
                console.log(error)
                return res.status(401).send({ status: 'failure', message: 'Error while updating password' })
            }
            
        
    }
}

module.exports = {
    Login,
    requestPasswordReset,
    resetPassword
}