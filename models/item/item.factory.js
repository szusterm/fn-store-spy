const ItemModel = require('./item.model');
const getObject = require('../../helpers/getResponseObject');

class Item {
	constructor() {
		this._findQuery = null;
	}

	async find() {

	}

	_getFilterFunctions() {
		return {
			ids: this._filterByIds,
			name: this._filterByName,
			type: this._filterByType
		}
	}

	_filterByIds(ids) {
		this._findQuery.where('_id').in(ids);
		return this._getFilterFunctions();
	}

	_filterByName(name) {
		//here
		this._findQuery.where('name').equals()
	}

	_filterByType(type) {
		this._findQuery.where('type').equals(type);
		return this._getFilterFunctions();
	}

	async _find(data) {
		try {
			const query = ItemModel.find(data);
			const response = await query.exec();

			return getObject(false, response);
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	async findById(ids) {
		const data = {
			_id: {$in: ids}
		};

		return await this._find(data);
	}

	async findByName(names) {
		const data = {
			name: {$in: names}
		};

		return await this._find(data);
	}
}

module.exports = new Item();