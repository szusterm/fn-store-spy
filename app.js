if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const config = require('./config');
const router = require('./routes/routes');
const spy = require('./core/spy');
require('./database/connect')();

spy.run({
	hour: config.general.checkingTime.hour,
	minute: config.general.checkingTime.minute
});


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

module.exports = app;
