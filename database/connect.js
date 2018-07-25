const mongoose = require('mongoose');

const config = require('../config/database');

const databaseUrl = `mongodb://${config.user}:${config.password}@${config.url}`;

module.exports = () => {
	mongoose.connect(databaseUrl, {useNewUrlParser: true});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Connection error:'));

	db.once('open', () => console.log(`Connected to: ${config.url}`));
};