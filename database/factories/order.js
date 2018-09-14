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

	async findMatchingByIds(itemsIds = []) {
		try {
			if (itemsIds.length > 0) {
				const query = OrderModel.find({
					'items.id': {$in: itemsIds}
				});
				const response = await query.exec();

				return getObject(false, response);
			}
			else {
				throw new Error();
			}
		}
		catch(error) {
			return getObject(true, error);
		}
	}

	_createItemsArray(itemFnbrIds) {
		const items = [];
		for(const itemId of itemFnbrIds) {
			items.push({
				fnbrId: itemId,
				done: false
			});
		}

		return items;
	}
}

module.exports = new Order();