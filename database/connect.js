const mongoose = require('mongoose');

const config = require('../config/database');

const databaseUrl = `mongodb://${config.user}:${config.password}@${config.url}`;

module.exports = () => {
	mongoose.connect(databaseUrl, {useNewUrlParser: true});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Mongoose connection error:'));

	db.once('open', () => console.log(`Mongoose connected to: ${config.url}`));

	db.on('disconnected', () => console.log('Mongoose disconnected'))
};