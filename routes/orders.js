const express = require('express');
const router = express.Router();
const middleware = require('../middleware/login') 

// Require the controllers WHICH WE DID NOT CREATE YET!!
const order = require('../controllers/orders');

// a simple test url to check that all of our files are communicating correctly.
router.post('/createOrder',middleware.verifyToken, order.createOrder);
router.get('/getAllOrders',middleware.verifyToken, order.getAllOrders);
router.get('/getCustomerOrders',middleware.verifyToken, order.getCustomersOrders);
router.get('/getSingleOrder/:order_id',middleware.verifyToken, order.getCustomerSingleOrder);
router.put('/cancelOrder/:order_id',middleware.verifyToken, order.cancelOrder);

module.exports = router;