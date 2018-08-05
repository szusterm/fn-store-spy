const order = require('../database/factories/order');
const shop = require('./shop');

class Spy {
	async run() {
		await shop.update();
		await this._checkItemsInOrders();
	}

	async _checkItemsInOrders() {
		const matchingOrders = await this._getMatchingOrders();

		for (const {items} of matchingOrders) {
			for (const {id, done} of items) {
				if (!done && shop.ids.includes(id)) {
					console.log('Got:', id);
				}
			}
		}
	}

	async _getMatchingOrders() {
		const offeredItemsIds = shop.ids;
		const response = await order.findMatchingByIds(offeredItemsIds);
		if (!response.err) {
			return response.data;
		}
		else {
			return false;
		}
	}
}

module.exports = new Spy();