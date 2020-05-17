const bcrypt = require('bcryptjs');
const CustomerModel = require('../models/customers')
const AdminModel = require('../models/admins')
const OrdersModel = require('../models/orders')
const OrderProductsModel = require('../models/order_products')
const ProductModel = require('../models/products')
const fs = require('fs')
const EmailAdapter = require('../helpers/mailAdapter')
const path  = require('path')
require('dotenv').config();
const config = require('../config/setup')
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
                try{
                const frontEndLink = config.frontend_url
                const html = fs.readFileSync(path.resolve(__dirname, '../emails/htmlPage.html'), 'utf8').toString()
                        .replace(/\$\{token\}/g, `${frontEndLink}/confirmAccount/`+newCustomer.id)
                const sendMail = await EmailAdapter.send('no-reply@bStore.com', email, 'Welcome To bStore', 'Congratulations, You are now an official bStore User', html)
                } catch (error) {
                    const removeUser = await CustomerModel.deleteCustomer(newCustomer.id)
                    return res.status(400).send({ status: 'failure', message: 'Failed to create user , please make sure that the email is correct' , error:error })
                }
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
        const allCustomers = await CustomerModel.getAllCustomers();
        const fillOrders = await OrderProductsModel.fillOrdersProducts(allCustomers)
        fillOrders.forEach(customer=>{
            customer.orders.forEach(order=>{
                order.groupedProducts=[]
                order.products.forEach(product=>{
                    if(order.groupedProducts[product.product_id]){
                        order.groupedProducts[product.product_id].count++
                    }else{
                        order.groupedProducts[product.product_id]={count:1,product:product.productData}
                    }
                })
                order.groupedProducts = order.groupedProducts.filter(holder=>holder)
                order.products = order.groupedProducts
                delete order.groupedProducts
            })
        })
        if(allCustomers){
            return res.status(200).send({ status: 'success', data: fillOrders  });
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
        const checkIfUserExists = await CustomerModel.getCustomerById( req.id)
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
            const updateUserData = await CustomerModel.updateCustomerData(checkIfUserExists.id , editObject)
            if(updateUserData){
                res.status(200).send({ status: 'success', message: 'Profile edited successfully' });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while editing profile' })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while fetching user information' })
    }
}
const deactivateProfile = async (req,res) => {
    const valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    const userID = parseInt(req.params.user_id)
    if(req.id !== userID){
        return res.status(400).send({ status: 'failure', message: 'You are unauthorized to make this action' });   
    }
    const checkIfCustomerExists = await CustomerModel.getCustomerById(userID)
    if(!checkIfCustomerExists){
        return res.status(403).send({ status: 'failure', message: 'account does not exist' });
    }
    if(checkIfCustomerExists.deleted){
        return res.status(400).send({ status: 'failure', message: 'Your account is already deactivated' });  
    }
    try {
        const deleteCustomerProfile = await CustomerModel.deactivateAccount(userID);
        if(deleteCustomerProfile){
            const userOrders = await OrdersModel.getCertainCustomerOrders(userID)
            var ordersIDs = []
            userOrders.forEach(order=>{
                if(!order.paid && !order.cancelled){
                    ordersIDs.push(order.id)
                }
            })
            if(ordersIDs.length>0){
                var cancelOrders = await Promise.all([ordersIDs.map(async order_id =>{
                    return OrdersModel.cancelOrder(order_id,userID)
                })])
                var productIDs = []
                const orderProductsIDs = await Promise.all( ordersIDs.map( async order_id =>{
                    const productsHolder = await OrderProductsModel.getOrderProducts(order_id)
                    productsHolder.forEach(product_object=>{productIDs.push(product_object.product_id)})
                }))
                if(productIDs.length>0){
                    var productsAndCounts = []
                    productIDs.forEach(id=>{
                        if(productsAndCounts[id]){
                            productsAndCounts[id]++
                        }else{
                            productsAndCounts[id]=1
                        }
                    })
                    var restoreProducts = await ProductModel.restoreItems(productsAndCounts)
                }
            }
            return res.status(200).send({ status: 'success', message:"Account deactivated successfully" });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while deleting customer' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while deleting customers' })
    }
}
const confirmAccount =  async function (req, res) {
    var valid_params = req.params && req.params.id
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Conifrmation Paramters are missing' });
    }else{
        const customer_id = req.params.id
        const findCustomer = await CustomerModel.getCustomerById( customer_id );
        if(!findCustomer){
            return res.status(400).send({ status: 'failure', message: 'Unauthorized Action' })
        }
        if(findCustomer.confirmed){
            return res.status(400).send({ status: 'failure', message: 'Account already confirmed' })
        }
        if(findCustomer.deleted){
            return res.status(400).send({ status: 'failure', message: 'Account deleted' })
        }
            const confirmUserAccount = await CustomerModel.confirmAccount(customer_id)
            if(confirmUserAccount){
                return res.status(200).send({ status: 'failure', message: 'Account activated successfully ! Please login.' });
            }else{
                return res.status(400).send({ status: 'failure', message: 'Error while confirming user account' })
            }
        
    }
}

module.exports = {
    customerSignup,
    getAllCustomers,
    viewProfile,
    editProfile,
    deactivateProfile,
    confirmAccount
}