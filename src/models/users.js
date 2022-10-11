const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Defines schemas
const User = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    username: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('User' , User);