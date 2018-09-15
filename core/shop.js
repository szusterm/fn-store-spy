const {fetchShop} = require('../services/fnbr/api');

class Shop {
	constructor() {
		this._items = [];
	}

	async update() {
		const {err, data: responseData} = await fetchShop();

		if (!err) {
			this._items = this._getMergedFeaturedAndDaily(responseData.data);
		}
	}

	_getMergedFeaturedAndDaily(shop) {
		const {featured, daily} = shop;

		return [...featured, ...daily];
	}

	get items() {
		return this._items;
	}

	get fnbrIds() {
		const ids = [];
		for (const {id} of this._items) {
			ids.push(id);
		}
		return ids;
	}

	get names() {
		const names = [];
		for (const {name} of this._items) {
			names.push(name);
		}
		return names;
	}
}

module.exports = new Shop();