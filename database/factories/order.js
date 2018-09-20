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

	update() {
		return {
			connect: async (...data) => await this._connectByCode(...data),
			disconnect: async (...data) => await this._disconnectByUserId(...data)
		};
	}

	find() {
		return {
			byCode: async (data) => await this._findByCode(data),
			matchingByFnbrIds: async (data) => await this._findMatchingByFnbrIds(data)
		};
	}

	async _updateByQuery(query, updateData) {
		try {
			const response = await OrderModel.findOneAndUpdate(query, updateData).exec();
			console.log(response);
			return getObject(false, response);
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	async _connectByCode(code = '', userId = '') {
		if (code && userId) {
			const updateData = {
				userId,
				used: true,
				connected: true
			};

			const disconnectionResponse = await this._disconnectByUserId(userId);

			if (!disconnectionResponse.err) {
				return await this._updateByQuery({code}, updateData);
			}

			return disconnectionResponse;
		}
	}

	async _disconnectByUserId(userId = '') {
		if (userId) {
			const queryData = {
				userId,
				connected: true
			};

			const updateData = {
				connected: false
			};

			return await this._updateByQuery(queryData, updateData);
		}
	}

	async _findByQuery(query) {
		try {
			const response = await OrderModel.find(query).exec();

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

	async _findMatchingByFnbrIds(itemsIds = [], connected = true) {
		if (itemsIds) {
			return await this._findByQuery({
				'items.fnbrId': {$in: itemsIds},
				connected
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