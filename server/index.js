const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();
let router = require('./routes');
const dotenv = require("dotenv");
app.use(express.json());
app.use(router);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

 