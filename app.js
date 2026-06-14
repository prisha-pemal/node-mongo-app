const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Request Logger
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// MongoDB 
mongoose.connect('mongodb://host.docker.internal:27017/mydb')
.then(() => {
    console.log('MongoDB Connected');
})
.catch((err) => {
    console.error('MongoDB Connection Error:', err);
});

// Test Route
app.get('/test', (req, res) => {
    res.send('TEST OK');
});

const userRoute = require('./routes/user');
app.use('/', userRoute);

// Home Route
app.get('/', (req, res) => {
    console.log('Rendering index.ejs');
    res.render('index');
});

app.listen(3000, () => {
    console.log('Running on port 3000');
});