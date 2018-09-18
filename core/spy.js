const order = require('../database/factories/order');
const shop = require('./shop');

class Spy {
	constructor() {
		this._matchingOrders = [];
	}

	async run() {
		await shop.update();
		await this._updateOrdersMatchingToOffer();
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

	async _updateOrdersMatchingToOffer() {
		const response = await order.find().matchingByFnbrIds(shop.fnbrIds);

		this._matchingOrders = (!response.err) ? response.data : [];
	}
}

module.exports = new Spy();