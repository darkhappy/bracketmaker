const express = require('express');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })

const app = express();
var router = require('./routes'); 
app.use(express.json());
app.use(router);
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

 