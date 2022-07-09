const express = require('express');
const expressHbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');

const { PORT, MONGO_URL } = require('./config/config');
const { restoreLocalfile2Mongo } = require('./helpers/savaDB');
const apiRouter = require('./router/api.router');

const app = express();

app.use(express.json());

app.use('/', apiRouter);

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

restoreLocalfile2Mongo();

_connectDB();

app.listen(PORT, () => {
    console.log(`start server ${PORT}`);
});
