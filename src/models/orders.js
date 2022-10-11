const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Defines schemas
const Order = new Schema({
    OrderId: {
        type: String,
        unique: true,
        required: true
    },
    UserId: {
        type: String,
        unique: true,
        required: true
    },
    MovieId: {
        type: String,
        unique: true,
        required: true
    },
    OrderDate: {
        type: Date,
        required: true
    },
    ReturnDate: {
        type: Date,
        required: true
    }
})

module.exports = mongoose.model('Order' , Order);