const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const CustomerSchema = new Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: false
    },
    orders:[
        { 
            type : ObjectId, 
            ref: 'orders' 
        }
    ],
    deleted:{
        type: Boolean,
        required: false,
        default:false
    },
    confirmed:{
        type: Boolean,
        required: false,
        default:false
    }
})
module.exports = Customer = mongoose.model('customers', CustomerSchema)