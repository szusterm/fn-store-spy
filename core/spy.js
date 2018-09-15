const order = require('../database/factories/order');
const shop = require('./shop');

class Spy {
	async run() {
		await shop.update();
		await this._sendMessagesToUsersWithMatchingOrders();
	}

	async _sendMessagesToUsersWithMatchingOrders() {
		await this._callFuncForEachOrder((order) => {
			for (const {fnbrId, done} of order.items) {
				if (!done && shop.fnbrIds.includes(fnbrId)) {
					//send this item
					console.log('Got:', fnbrId);
				}
			}
		});
	}

	async _callFuncForEachOrder(callback) {
		const matchingOrders = await this._getOrdersMatchingToOffer();

		if (matchingOrders) {
			for (const matchingOrder of matchingOrders) {
				callback(matchingOrder);
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