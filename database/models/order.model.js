const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	code: String,
	used: {type: Boolean, default: false},
	connected: {type: Boolean, default: false},
	userId: {type: String, default: ''},
	items: [
		{
			fnbrId: String,
			done: {type: Boolean, default: false}
		}
	],
	date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);