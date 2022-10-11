const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Defines schemas
const Movie = new Schema({
    MovieId: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        unique: true,
    },
    Genre: {
        type: String,
        required: true
    },
    TrailerURL: {
        type: String,
        required: true
    },
    ReleaseDate: {
        type: Date,
        required: true
    },
    Rating: {
        type: Object,
        required: true
    },
    Overview: {
        type: Object,
        required: true
    }
})

module.exports = mongoose.model('Movie' , Movie);