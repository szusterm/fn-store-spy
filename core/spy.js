const order = require('../database/factories/order');
const shop = require('./shop');
const messenger = require('./messenger');

class Spy {
	constructor() {
		this._matchingOrders = [];
	}

	async run() {
		await shop.update();
		await this._updateOrdersMatchingToOffer();

		await this._callActionsInCheckingOrders({
			onEnterOrder: async (userId) => await messenger.sendTemplateMessage(userId, 'ORDER_FOUND'),
			onFindItem: async (userId, item) => await messenger.sendItemMessage(userId, item),
			onLeaveOrder: (userId) => true
		});
	}

	async _callActionsInCheckingOrders(actions) {
		const {
			onEnterOrder = () => true,
			onFindItem = () => true,
			onLeaveOrder = () => true
		} = actions;

		for (const {items, userId} of this._matchingOrders) {
			await onEnterOrder(userId);

			for (const singleItem of items) {
				const {fnbrId, done} = singleItem;

				if (!done && shop.fnbrIds.includes(fnbrId)) {
					await onFindItem(userId, singleItem);
				}
			}

			await onLeaveOrder(userId);
		}
	}

	async _updateOrdersMatchingToOffer() {
		const response = await order.find().matchingByFnbrIds(shop.fnbrIds);

		this._matchingOrders = (!response.err) ? response.data : [];
	}
}

module.exports = new Spy();