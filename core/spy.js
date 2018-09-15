const order = require('../database/factories/order');
const shop = require('./shop');

class Spy {
	async run() {
		await shop.update();
		await this._callFuncAfterFindItemInOrder(() => {});
	}

	async _callFuncAfterFindItemInOrder(onMatch) {
		const matchingOrders = await this._getOrdersMatchingToOffer();

		for (const {items} of matchingOrders) {
			for (const {id, done} of items) {
				if (!done && shop.fnbrIds.includes(id)) {
					onMatch();
					console.log('Got:', id);
				}
			}
		}
	}

	async _getOrdersMatchingToOffer() {
		const offeredItemsIds = shop.fnbrIds;
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