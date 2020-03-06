const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const OrderSchema = new Schema({
    payed:{
        type: Boolean,
        required:false,
        default:false
    },
    cancelled:{
        type: Boolean,
        required: false,
        default: false
    },
    payed_at:{
        type: Date,
        required: false
    },
    cancelled_at:{
        type: Date,
        required: false
    },
    products:[
        { 
            type : ObjectId, 
            ref: 'products' 
        }
    ],
    user_id:{
        type: ObjectId,
        ref:'customers'
    }
})
module.exports = Customer = mongoose.model('orders', OrderSchema)