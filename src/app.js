const express = require('express');
const app = express();
require('dotenv').config();

app.get('/' , (req,res) => {
    res.send('This is a test print');
});

app.listen(process.env.PORT , () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
