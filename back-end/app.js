const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { PORT, MONGO_URL, COOKIE_SECRET_KEY } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOKIE_SECRET_KEY));

app.use('/', apiRouter);

app.use(express.static(path.join(__dirname, './static')));

app.set('view engine', '.hbs');

app.engine('.hbs', expressHbs.engine({
    defaultLayout: false
}));

app.set('views', path.join(__dirname, './static'));

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    console.log('****************************');
    console.log(err);
    console.log('****************************');
    res.status(err.status || 500).json({
        status: err.status || 500,
        errorStatus: err.errorStatus || 0,
        message: err.message || '',
    });
});

function _connectDB() {
    mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
}

_connectDB();

app.listen(PORT, () => {
    console.log(`start server ${PORT}`);
});
