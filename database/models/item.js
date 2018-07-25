const {Schema, model} = require('mongoose');

const ItemSchema = new Schema({
	name: String,
	type: String,
	rarity: String,
	price: String,
	imageSrc: String
});

module.exports = model('Item', ItemSchema);