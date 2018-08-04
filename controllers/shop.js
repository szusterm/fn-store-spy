const item = require('../models/item/index');

class Shop {
	constructor() {
		this._items = [];
	}

	async update() {
		const offeredItems = [
			{
				id: '5b5873f0fb6fc0105da12b28',
				name: 'Battle Hound'
			}
		];

		const itemsNames = this._getNamesFromObjects(offeredItems);
		return await this._updateItemsWithDatabase(itemsNames);
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

	_getNamesFromObjects(objects) {
		const names = [];
		for (const {name} of objects) {
			names.push(name);
		}
		return names;
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