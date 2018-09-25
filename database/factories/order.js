const OrderModel = require('../models/order.model');
const item = require('./item');
const getObject = require('../../helpers/getResponseObject');
const config = require('../../config');

class Order {
	async add(itemsFnbrIds = [], code) {
		try {
			if (this._isArrayWithCorrectLength(itemsFnbrIds)) {
				if (await this._areFnbrIdsCorrect(itemsFnbrIds)) {
					const items = this._createItemsArray(itemsFnbrIds);

					const order = new OrderModel({
						code,
						connected: false,
						items
					});

					await order.save();

					return getObject(false, {code, items});
				}
			}

			throw new Error('Incorrect fnbrIds array');
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
				userId: '',
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

	async _areFnbrIdsCorrect(fnbrIds = []) {
		if (fnbrIds) {
			const {err, data} = await item.find().fnbrIds(fnbrIds).exec();

			if (!err) {
				const {items} = data;

				if (items.length === fnbrIds.length) {
					return true;
				}
			}
		}

		return false;
	}

	_isArrayWithCorrectLength(fnbrIds = []) {
		const {maxItemsInOrder} = config.ordering;

		if (fnbrIds) {
			if (Array.isArray(fnbrIds)) {
				if (fnbrIds.length > 0 && fnbrIds.length <= maxItemsInOrder) {
					return true;
				}
			}
		}

		return false;
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