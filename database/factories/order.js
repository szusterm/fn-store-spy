const OrderModel = require('../models/order.model');
const getObject = require('../../helpers/getResponseObject');

class Order {
	async add(itemFnbrIds = [], code) {
		try {
			const items = this._createItemsArray(itemFnbrIds);

			const order = new OrderModel({
				code,
				connected: false,
				items
			});

			await order.save();

			return getObject(false, {code, items});
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	find() {
		return {
			code: async (data) => await this._findByCode(data),
			matchingByFnbrIds: async (data) => await this._findMatchingByFnbrIds(data)
		};
	}

	async _findByQuery(data) {
		try {
			const query = OrderModel.find(data);
			const response = await query.exec();

			return getObject(false, response);
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	async _findByCode(code = '') {
		if (code) {
			return await this._findByQuery({code});
		}
	}

	async _findMatchingByFnbrIds(itemsIds = []) {
		if (itemsIds) {
			return await this._findByQuery({
				'items.fnbrId': {$in: itemsIds}
			});
		}
	}

	_createItemsArray(itemFnbrIds) {
		const items = [];
		for (const itemId of itemFnbrIds) {
			items.push({
				fnbrId: itemId,
				done: false
			});
		}

		return items;
	}
}

module.exports = new Order();