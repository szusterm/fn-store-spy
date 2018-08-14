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
			const {maxItemsPerPage} = clientConfig;

			const items = await this._findingQuery.exec();
			const nextPageAvailable = this._existsNextPage(items.length);
			const itemsWithoutExcess = this._getItemsWithoutExcess(items);

			const response = {
				items: itemsWithoutExcess,
				maxItemsPerPage,
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
		if (name) {
			const nameContaining = new RegExp(`^.*${name}.*$`);
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
		if (this._existsNextPage(items.length)) {
			items.pop();
		}

		return items;
	}

	_existsNextPage(itemsCount) {
		const {maxItemsPerPage} = clientConfig;
		return (itemsCount > maxItemsPerPage);
	}
}

module.exports = new Item();