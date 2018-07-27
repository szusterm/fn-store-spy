const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
	code: String,
	connected: Boolean,
	items: [{id: String, done: Boolean}]
});

module.exports = mongoose.model('Dream', OrderSchema);