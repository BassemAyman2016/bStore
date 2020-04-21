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
const OrderModel = require('../models/orders')
const AdminModel = require('../models/admins')
const ProductModel = require('../models/products')
const OrderProducts = require('../models/order_products')
const fs = require('fs')
const EmailAdapter = require('../helpers/mailAdapter')
const path  = require('path')
require('dotenv').config();

const createOrder =  async function (req, res) {
    var valid_params = req.body && req.body.products 
    const checkIfUserExists = await CustomerModel.getCustomerById(req.id)
    if(!checkIfUserExists){
        return res.status(403).send({ status: 'failure', message: 'you are not a user of this platform' });
    }
    if(checkIfUserExists.deleted){
        return res.status(403).send({ status: 'failure', message: 'your account is deactivated' });
    }
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order creation paramters are missing' });
    }else{
        try{
            var itemUnavailable = false 
            var products = []
            var priceSum = 0
            var checkItems = await Promise.all( req.body.products.map(async (productObj,index)=>{
                var productObject = await ProductModel.getProductById(productObj.id)
                console.log("productObject",productObject)
                if(!productObject) return res.status(400).send({ status: 'failure', message: 'Product(s) does not exist' });
                priceSum += productObject.price * productObj.count
                products.push(productObj)
                if( (productObject.stock-productObj.count) <0 ){
                    itemUnavailable = true
                }
                return productObject
            }))
            if(checkItems){
                if(itemUnavailable){
                    return res.status(400).send({ status: 'failure', message: 'An item(s) is unavailable, please clear your cart and re-add products' })    
                }else{
                    const createOrder = await OrderModel.createOrder(checkIfUserExists.id,priceSum)
                    if(!createOrder){
                        return res.status(404).send({ status: 'failure', message: 'Error occured in order creation'})
                    }
                    const decreaseProductStock = await ProductModel.decrementProductStock(products)
                    if(!decreaseProductStock){
                        return res.status(404).send({ status: 'failure', message: 'Error occured in order creation' })
                    }
                    const insertOrderProducts = await OrderProducts.insertProducts(products,createOrder)
                    if(insertOrderProducts)
                        return res.status(200).send({ status: 'success', message: 'Order created successfully' , order_id:createOrder.id});
                    else{
                        return res.status(401).send({ status: 'failure', message: 'Error occured in order creation'  })
                    }
                }
            }
        }catch(err){
            console.log(err)
            return res.status(400).send({ status: 'failure', message: 'Error occured in order creation' , err: err })
        }
    }
}
const getAllOrders = async (req,res) => {
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const allOrders = await OrderModel.getAllOrders();
        if(allOrders){
            allOrders.forEach(order=>{
                order.groupedProducts=[]
                order.products.forEach(product=>{
                    if(order.groupedProducts[product.id]){
                        order.groupedProducts[product.id].count++
                    }else{
                        order.groupedProducts[product.id]={count:1,product}
                    }
                })
                order.groupedProducts = order.groupedProducts.filter(holder=>holder)
                order.products = order.groupedProducts
                delete order.groupedProducts
            })
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
    const checkIfCustomer = await CustomerModel.getCustomerById(req.id)
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(checkIfCustomer.deleted){
        return res.status(403).send({ status: 'failure', message: 'your account is deactivated' });
    }
    try {
        const customerOrders = await OrderModel.getCertainCustomerOrders(checkIfCustomer.id)
        customerOrders.forEach(order=>{
            order.groupedProducts=[]
            order.products.forEach(product=>{
                if(order.groupedProducts[product.id]){
                    order.groupedProducts[product.id].count++
                }else{
                    order.groupedProducts[product.id]={count:1,product}
                }
            })
            order.groupedProducts = order.groupedProducts.filter(holder=>holder)
            order.products = order.groupedProducts
            delete order.groupedProducts
        })
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
    const checkIfCustomer = await CustomerModel.getCustomerById(req.id)
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(checkIfCustomer.deleted){
        return res.status(403).send({ status: 'failure', message: 'your account is deactivated' });
    }
    try {
        const customerOrder = await OrderModel.getSingleOrder(req.params.order_id, checkIfCustomer.id)
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
    const checkIfCustomer = await CustomerModel.getCustomerById(req.id)
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(checkIfCustomer.deleted){
        return res.status(403).send({ status: 'failure', message: 'your account is deactivated' });
    }
    try {
        const findOrder = await OrderModel.getSingleOrder(req.params.order_id,checkIfCustomer.id)
        if(!findOrder){
            return res.status(401).send({ status: 'failure', message: 'Order not found' });
        }
        if( findOrder.payed ){
            return res.status(401).send({ status: 'failure', message: 'Order is already payed' });
        }
        if( findOrder.cancelled ){
            return res.status(401).send({ status: 'failure', message: 'Order is already cancelled' });
        }
        const cancelOrder = await OrderModel.cancelOrder(req.params.order_id,checkIfCustomer.id)
        if(!cancelOrder){
            return res.status(400).send({ status: 'failure', message: 'Error while cancelling order' })
        }
        const  orderItems = await OrderProducts.getOrderProducts(req.params.order_id)    
        if(!orderItems){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while fetching order products' });
        }
        var productAndCounts = []
        orderItems.forEach(item=>{
            if(productAndCounts[item.product_id]){
                productAndCounts[item.product_id]++
            }else{
                productAndCounts[item.product_id]=1
            }
        })
        const restoreItemsStock = await ProductModel.restoreItems(productAndCounts)
        if(!restoreItemsStock){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while restoring product stocks' });
        }
        if(restoreItemsStock.state && restoreItemsStock.state=="failure"){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while restoring product stocks error' });
        }   
        return res.status(200).send({ status: 'success', message:"Order cancelled successfully",data:productAndCounts });
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while cancelling order' })
    }
}
const payOrder = async (req,res) => {
    var valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order payment paramters are missing' });
    }
    const checkIfCustomer = await CustomerModel.getCustomerById(req.id)
    if(!checkIfCustomer){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    if(checkIfCustomer.deleted){
        return res.status(403).send({ status: 'failure', message: 'your account is deactivated' });
    }
    try {
        const findOrder = await OrderModel.getSingleOrder(req.params.order_id,checkIfCustomer.id)
        if(!findOrder){
            return res.status(401).send({ status: 'failure', message: 'Order not found' });
        }
        if( findOrder.payed ){
            return res.status(401).send({ status: 'failure', message: 'Order is already payed' });
        }
        if( findOrder.cancelled ){
            return res.status(401).send({ status: 'failure', message: 'Order is already cancelled' });
        }
        const payOrder = await OrderModel.payOrder(req.params.order_id,checkIfCustomer.id)
        if(!payOrder){
            return res.status(400).send({ status: 'failure', message: 'Error while paying order' })
        }else{
            const email = checkIfCustomer.email
            const html = fs.readFileSync(path.resolve(__dirname, '../emails/paymentEmail.html'), 'utf8').toString()
            const sendMail = await EmailAdapter.send('no-reply@bStore.com', email, 'Order Payment Notification', 'Congratulations, you payed for your order', html)
        }
        return res.status(200).send({ status: 'success', message:"Order payed successfully" });
    } catch (error) {
        console.log(error)
        return res.status(401).send({ status: 'failure', message: 'Error occurred while paying order' ,error:error })
    }
}
const adminCancelOrder = async (req,res) => {
    var valid_params = req.params
    if(!valid_params){
        return res.status(400).send({ status: 'failure', message: 'Order cancellation paramters are missing' });
    }
    const checkIfAdmin = await AdminModel.getAdminById(req.id)
    if(!checkIfAdmin){
        return res.status(403).send({ status: 'failure', message: 'you are unauthorized to do this action' });
    }
    try {
        const findOrder = await OrderModel.getOrderById(req.params.order_id)
        if(!findOrder){
            return res.status(401).send({ status: 'failure', message: 'Order not found' });
        }
        if( findOrder.payed ){
            return res.status(401).send({ status: 'failure', message: 'Order is already payed' });
        }
        if( findOrder.cancelled ){
            return res.status(401).send({ status: 'failure', message: 'Order is already cancelled' });
        }
        const cancelOrder = await OrderModel.adminCancelOrder(req.params.order_id)
        if(!cancelOrder){
            return res.status(400).send({ status: 'failure', message: 'Error while cancelling order' })
        }
        const  orderItems = await OrderProducts.getOrderProducts(req.params.order_id)    
        if(!orderItems){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while fetching order products' });
        }
        var productAndCounts = []
        orderItems.forEach(item=>{
            if(productAndCounts[item.product_id]){
                productAndCounts[item.product_id]++
            }else{
                productAndCounts[item.product_id]=1
            }
        })
        const restoreItemsStock = await ProductModel.restoreItems(productAndCounts)
        if(!restoreItemsStock){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while restoring product stocks' });
        }
        if(restoreItemsStock.state && restoreItemsStock.state=="failure"){
            return res.status(401).send({ status: 'failure', message: 'Error occurred while restoring product stocks error' });
        }   
        return res.status(200).send({ status: 'success', message:"Order cancelled successfully",data:productAndCounts });
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
    cancelOrder,
    payOrder,
    adminCancelOrder
}