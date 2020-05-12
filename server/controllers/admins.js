const bcrypt = require('bcryptjs');
const AdminModel = require('../models/admins')
const CustomerModel = require('../models/customers')
const OrdersModel = require('../models/orders')
const OrderProductsModel = require('../models/order_products')
const ProductModel = require('../models/products')
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
            return res.status(200).send({ status: 'success', data: deleteCustomerProfile , message: 'Customer deleted successfully'});
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching deleting customer' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while deleting customers' })
    }
}
const deactivateAccount = async (req,res) => {
    const valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    const userID = parseInt(req.params.user_id)
    const checkIfCustomerExists = await CustomerModel.getCustomerById(userID)
    if(!checkIfCustomerExists){
        return res.status(403).send({ status: 'failure', message: 'account does not exist' });
    }
    if(checkIfCustomerExists.deleted){
        return res.status(400).send({ status: 'failure', message: 'Customer account is already deactivated' });  
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
const activateAccount = async (req,res) => {
    const valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Paramters are missing' });    
    }
    const userID = parseInt(req.params.user_id)
    
    const checkIfCustomerExists = await CustomerModel.getCustomerById(userID)
    if(!checkIfCustomerExists){
        return res.status(403).send({ status: 'failure', message: 'account does not exist' });
    }
    if(!checkIfCustomerExists.deleted && checkIfCustomerExists.confirmed){
        return res.status(400).send({ status: 'failure', message: 'Customer account is already active' });  
    }
    try {
        const activateCustomerAccount = await CustomerModel.activateAccount(userID);
        const confirmAccount = await CustomerModel.confirmAccount(userID)
        if(activateCustomerAccount && confirmAccount){
            return res.status(200).send({ status: 'success', message:"Account activated successfully" });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while activating customer' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(400).send({ status: 'failure', message: 'Error occurred while activating customers' })
    }
}
module.exports = {
    adminSighUp,
    adminDeleteCustomer,
    deactivateAccount,
    activateAccount
}