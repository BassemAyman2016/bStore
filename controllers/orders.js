// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const passport = require('passport')
// const Group = require('../models/Group');
// const Product = require('../models/Product')
// const Admin = require('../models/Admin')
// const Order = require('../models/Order')
// const Customer = require('../models/Customer')
// const tokenKey = require('../config').secretOrKey
const CustomerModel = require('../models/customers')
const orderModel = require('../models/orders')
const AdminModel = require('../models/admins')
const ProductModel = require('../models/products')
require('dotenv').config();

const createOrder =  async function (req, res) {
    var valid_params = req.body && req.body.products 
    const checkIfUserExists = await CustomerModel.getCustomerById(req.id)
    if(!checkIfUserExists){
        return res.status(403).send({ status: 'failure', message: 'you are not a user of this platform' });
    }
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order creation paramters are missing' });
    }else{
        try{
            // const orderCreated = await Order.create({ products:req.body.products , user_id: req.id })
            // const orderCreated = await Order.create({ products:req.body.products , user_id: req.id })
            // if(orderCreated){
            //     const appendOrderToUserOrders = await Customer.updateOne({_id:checkIfUserExists._id}, {orders:[...checkIfUserExists.orders,orderCreated._id]})
            //     if(appendOrderToUserOrders){
            //         return res.status(200).send({ status: 'success', message: 'Order created successfully', data: appendOrderToUserOrders });
            //     }else{
            //         return res.status(400).send({ status: 'failure', message: 'Error occured while adding order to previous user orders' })
            //     }
            // }else{
            //     return res.status(400).send({ status: 'failure', message: 'Error occured while creating order' })
            // }
            var itemUnavailable = false 
            var dummyArray = []
            var priceSum = 0
            var checkItems = await Promise.all( req.body.products.map(async (product_id)=>{
                var productObject = await ProductModel.getProductById(product_id)
                priceSum += productObject.price
                console.log(product_id , productObject)
                if(productObject.stock<=0){
                    itemUnavailable = true
                }
            }))
            if(itemUnavailable){
                return res.status(400).send({ status: 'failure', message: 'An item(s) is unavailable, please refresh page' })    
            }
            return res.status(200).send({ status: 'success', message: 'Order created successfully', data: itemUnavailable , con:priceSum});
        }catch(err){
            console.log(err)
            return res.status(400).send({ status: 'failure', message: 'Error occured in order creation' , err: err })
        }
    }
}
const getAllOrders = async (req,res) => {
    const checkIfAdmin = await Admin.findOne({ _id : req.id })
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const allOrders = await Order.find().populate('products');
        if(allOrders){
            return res.status(200).send({ status: 'success', data: allOrders });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching orders' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while fetching orders' })
    }
}
const getCustomersOrders = async (req,res) => {
    const checkIfCustomer = await Customer.findOne({ _id : req.id })
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const customerOrders = await Order.find({ user_id: req.id}).populate('products')
            // await Order.find().populate('products');
        if(customerOrders){
            return res.status(200).send({ status: 'success', data: customerOrders });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching orders' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while fetching orders' })
    }
}
const getCustomerSingleOrder = async (req,res) => {
    var valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order fetch paramters are missing' });
    }
    const checkIfCustomer = await Customer.findOne({ _id : req.id })
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const customerOrder = await Order.findOne({ _id: req.params.order_id , user_id: req.id}).populate('products')
            // await Order.find().populate('products');
        if(customerOrder){
            return res.status(200).send({ status: 'success', data: customerOrder });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while fetching order' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while fetching order' })
    }
}
const cancelOrder = async (req,res) => {
    var valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order cancellation paramters are missing' });
    }
    const checkIfCustomer = await Customer.findOne({ _id : req.id })
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const cancelOrder = await Order.findOneAndUpdate({ _id: req.params.order_id , user_id: req.id}, {cancelled:true})
            // await Order.find().populate('products');
        if(cancelOrder){
            return res.status(200).send({ status: 'success', data: cancelOrder });
        }else{
            return res.status(400).send({ status: 'failure', message: 'Error while cancelling order' })
        }            
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while cancelling order' })
    }
}
module.exports = {
    createOrder,
    getAllOrders,
    getCustomersOrders,
    getCustomerSingleOrder,
    cancelOrder
}