const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

require('./models/connect')();
const spy = require('./controllers/spy');
setTimeout(() => spy.run(), 3000);

const orderRouter = require('./routes/order');
const itemsRouter = require('./routes/items');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/order', orderRouter);
app.use('/items', itemsRouter);

module.exports = app;
