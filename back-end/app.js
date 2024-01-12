const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { PORT, MONGO_URL, COOKIE_SECRET_KEY } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors());

app.use(limiter);

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(COOKIE_SECRET_KEY));

app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    next();
});

app.use('/', apiRouter);

app.use(express.static(path.join(__dirname, './static')));

app.set('view engine', '.hbs');

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
    mongoose
        .set('debug', true)
        .set('strictQuery', true)
        .set('useNewUrlParser', true)
        .set('useUnifiedTopology', true)
        .connect(MONGO_URL)
        .then(() => console.log('Database connection successful.'))
        .catch((error) => {
            console.log(error.message);
            process.exit(1);
        });
}

_connectDB();

app.listen(PORT, () => {
    console.log(`start server ${PORT}`);
});
