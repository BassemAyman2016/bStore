const mongoose = require('mongoose');
const Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
const AdminSchema = new Schema({
    first_name: {
        type: String,
        required: false
    },
    last_name: {
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
    }  
})
module.exports = Admin = mongoose.model('admins', AdminSchema)