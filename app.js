const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const { PORT, MONGO_URL } = require('./config/config');

const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', apiRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res.status(err.status || 500).json({
        customStatus: err.customStatus || 0,
        message: err.message || ''
    });
});

app.use(express.static(path.join(__dirname, './static')));

app.set('view engine', '.hbs');

app.engine('.hbs', expressHbs.engine({
    defaultLayout: false
}));

app.set('views', path.join(__dirname, './static'));

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
