const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// MongoDB Connection
mongoose.connect('mongodb://mongodb:27017/mydb')
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.error('MongoDB Connection Error:', err);
});

const userRoute = require('./routes/user');

app.use('/', userRoute);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});