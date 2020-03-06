const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    brand:{
        type:String,
        required: false
    },
    model:{
        type:String,
        required: false
    },
    price:{
        type: Number,
        required: false
    },
    category_id:{
        type: ObjectId,
        required: true,
        ref: 'categories'
    },
    stock:{
        type: Number,
        required: false
    },
    images:{
        type: [String],
        required: false
    }

})
module.exports = Product = mongoose.model('products', ProductSchema)