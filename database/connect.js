const mongoose = require('mongoose');

const databaseUrl = require('./getConnectionUrl')();

module.exports = () => {
	const {DB_URL} = process.env;

	mongoose.connect(databaseUrl, {useNewUrlParser: true});

	const db = mongoose.connection;

	db.on('error', console.error.bind(console, 'Mongoose connection error:'));

	db.once('open', () => console.log(`Mongoose connected to: ${DB_URL}`));

	db.on('disconnected', () => console.log('Mongoose disconnected'));
};