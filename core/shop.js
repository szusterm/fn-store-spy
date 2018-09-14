const {fetchShop} = require('../helpers/callApiRequest');

class Shop {
	constructor() {
		this._items = [];
	}

	async update() {
		const {err, data: currentShop} = await fetchShop();

		if (!err) {
			this._items = this._getMergedFeaturedAndDaily(currentShop);
		}
	}

	async _updateItemsWithDatabase(itemsNames) {
		const response = await item.find().names(itemsNames).exec();
		if (!response.err) {
			this._items = response.data;
			return true;
		}
		else {
			return false;
		}
	}

	_getMergedFeaturedAndDaily(shop) {
		const {featured, daily} = shop;

		return [...featured, ...daily];
	}

	get items() {
		return this._items;
	}

	get ids() {
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