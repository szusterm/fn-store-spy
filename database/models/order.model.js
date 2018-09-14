const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	code: String,
	connected: Boolean,
	items: [{fnbrId: String, done: Boolean}]
});

module.exports = mongoose.model('Order', OrderSchema);