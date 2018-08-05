const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
	name: String,
	type: String,
	rarity: String,
	price: String,
	imageSrc: String
});

module.exports = mongoose.model('Item', ItemSchema);