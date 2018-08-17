const ItemModel = require('../models/item.model');
const getObject = require('../../helpers/getResponseObject');
const clientConfig = require('../../config/client');

class Item {
	constructor() {
		this._findingQuery = null;
	}

	find() {
		this._findingQuery = ItemModel.find({});
		return this._getFilterFunctions();
	}

	async _execQuery() {
		try {
			const items = await this._findingQuery.exec();
			const itemsWithoutExcess = this._getItemsWithoutExcess(items);
			const nextPageAvailable = this._existsNextPage(items.length);

			const response = {
				items: itemsWithoutExcess,
				nextPageAvailable
			};

			return getObject(false, response);
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	_getFilterFunctions() {
		return {
			ids: (data) => this._filterByIds(data),
			name: (data) => this._filterByNameContainingText(data),
			names: (data) => this._filterByNames(data),
			type: (data) => this._filterByType(data),
			page: (data) => this._setPage(data),
			exec: (data) => this._execQuery(data)
		};
	}

	_filterByIds(ids = null) {
		if (ids) {
			this._findingQuery.where('_id').in(ids);
		}
		return this._getFilterFunctions();
	}

	_filterByNameContainingText(name = null) {
		const {minNameFilterLength, maxNameFilterLength} = clientConfig;

		if (
			name &&
			name.length >= minNameFilterLength &&
			name.length <= maxNameFilterLength
		) {
			const nameContaining = this._getNameRegExp(name);
			this._findingQuery.where('name').equals(nameContaining);
		}

		return this._getFilterFunctions();
	}

	_filterByNames(names = null) {
		if (names) {
			this._findingQuery.where('name').in(names);
		}
		return this._getFilterFunctions();
	}

	_filterByType(type = null) {
		if (type) {
			this._findingQuery.where('type').equals(type);
		}
		return this._getFilterFunctions();
	}

	_setPage(page = 1) {
		let fixedPage = Number(page);
		fixedPage = (fixedPage >= 1) ? fixedPage : 1;

		const {maxItemsPerPage} = clientConfig;
		const firstItemOnPage = (maxItemsPerPage * fixedPage - maxItemsPerPage);

		this._findingQuery
			.limit(maxItemsPerPage + 1)//Adding one to check later, that exists next page
			.skip(firstItemOnPage);

		return this._getFilterFunctions();
	}

	_getItemsWithoutExcess(items) {
		const fixedItems = [...items];

		if (this._existsNextPage(fixedItems.length)) {
			fixedItems.pop();
		}

		return fixedItems;
	}

	_existsNextPage(itemsCount) {
		const {maxItemsPerPage} = clientConfig;
		return (itemsCount > maxItemsPerPage);
	}

	_getNameRegExp(name = '') {
		let nameLowerAndUpperCase = '';

		for (let charId = 0; charId < name.length; charId++) {
			const char = name.charAt(charId);
			const charLowerCase = char.toLowerCase();
			const charUpperCase = char.toUpperCase();

			nameLowerAndUpperCase += `[${charLowerCase}${charUpperCase}]`;
		}

		return new RegExp(`^.*(${nameLowerAndUpperCase}).*$`);
	}
}

module.exports = new Item();