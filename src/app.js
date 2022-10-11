const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require("mongoose");

const connectToDB = async () => {
    await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
}

connectToDB();

app.get('/' , (req,res) => {
    res.send('This is a test'); //test printing..
});

app.listen(process.env.PORT , () => {
    console.log(`Listening on port ${process.env.PORT}`);
});