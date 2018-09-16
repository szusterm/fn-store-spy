const order = require('../database/factories/order');
const shop = require('./shop');

class Spy {
	constructor() {
		this._matchingOrders = [];
	}

	async run() {
		await shop.update();

		const response = await this._getOrdersMatchingToOffer();
		this._matchingOrders = (response) ? response : [];

		await this._callActionsInCheckingOrders();
	}

	async _callActionsInCheckingOrders(actions) {
		const {
			onFindUser = () => true,
			onFindItem = () => true,
			onLeaveUser = () => true
		} = actions;

		for (const order of this._matchingOrders) {
			await onFindUser();

			for (const {fnbrId, done} of order.items) {
				if (!done && shop.fnbrIds.includes(fnbrId)) {
					await onFindItem();
				}
			}

			await onLeaveUser();
		}
	}

	async _getOrdersMatchingToOffer() {
		const offeredItemsIds = shop.fnbrIds;
		const response = await order.findMatchingByFnbrIds(offeredItemsIds);
		if (!response.err) {
			return response.data;
		}
		else {
			return false;
		}
	}
}

module.exports = new Spy();