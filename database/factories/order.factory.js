const OrderModel = require('../models/order');
const getObject = require('../../helpers/getResponseObject');

class Order {
	async add(itemIds = []) {
		try {
			const code = this._createCode();
			const items = this._createItemsArray(itemIds);

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

	async findMatching(itemIds = []) {
		try {
			if (itemIds.length > 0) {
				const query = OrderModel.find({
					'items.id': {$in: itemIds}
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

	_createCode() {
		return 'code';
	}

	_createItemsArray(itemIds) {
		const items = [];
		for(const itemId of itemIds) {
			items.push({
				id: itemId,
				done: false
			});
		}

		return items;
	}
}

module.exports = () => new Order();