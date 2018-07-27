class Shop {
	constructor() {
		this._items = [];
	}

	update() {
		this._items = [{name: 'Battle Hound'}];
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