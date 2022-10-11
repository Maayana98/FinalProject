let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema define
let OrderSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        required: true
    },
    orderId: {
        type: String,
        unique: true,
        required: true
    },
    movieId: {
        type: String,
        required: true
    },
}, {versionKey: false, timestamps: true})

const Reservations = mongoose.model('Orders', OrderSchema);
module.exports = Reservations;