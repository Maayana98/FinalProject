const mongoose = require("mongoose");

const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = {dbConnect}