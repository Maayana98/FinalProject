let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema define
const MovieSchema = new Schema({
    movieName: {
        unique: true,
        type: String,
        required: true,
        dropDups: true
    },
    movieId: {
        unique: true,
        type: String,
        required: true,
        dropDups: true
    },
    genre: {
        required: true,
        type: Object,
        dropDups: true
    },
    rating: {
        required: true,
        type: Object,
        dropDups: true
    },
    price: Number,
    guestReviews: Object
}, {versionKey: false, timestamps: true})

const Movies = mongoose.model('Movies', MovieSchema);
module.exports = Movies;