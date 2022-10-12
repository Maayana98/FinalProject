let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema define
let UsersSchema = new Schema({
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
    sessionKey: {
        type: String
    },
    userOrders: {
        type: Array
    }
}, {versionKey: false, timestamps: true})

const Users = mongoose.model('Users', UsersSchema);
module.exports = Users;