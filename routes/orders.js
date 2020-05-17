const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

const order = require('../controllers/orders');

router.post('/createOrder',middleware.verifyToken, order.createOrder);
router.get('/getAllOrders',middleware.verifyToken, order.getAllOrders);
router.get('/getCustomerOrders',middleware.verifyToken, order.getCustomersOrders);
router.get('/getSingleOrder/:order_id',middleware.verifyToken, order.getCustomerSingleOrder);
router.put('/cancelOrder/:order_id',middleware.verifyToken, order.cancelOrder);
router.put('/payOrder/:order_id',middleware.verifyToken, order.payOrder);
router.put('/adminCancelOrder/:order_id',middleware.verifyToken, order.adminCancelOrder);


module.exports = router;