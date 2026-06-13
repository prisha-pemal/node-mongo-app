const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

mongoose.connect(
'mongodb://localhost:27017/userdb'
);

const userRoute = require('./routes/user');

app.use('/', userRoute);

app.get('/', (req,res)=>{
    res.render('index');
});

app.listen(3000,()=>{
    console.log('Running on port 3000');
});