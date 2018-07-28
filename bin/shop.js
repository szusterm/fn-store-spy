const item = require('../models/item');

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
		await this._completeWithDatabase(offeredItems);
	}

	async _completeWithDatabase(offeredItems) {
		const offeredItemsNames = this._getNamesFromObjects(offeredItems);
		const response = await item.findByName(offeredItemsNames);
		if (!response.err) {
			this._items = response.data;
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