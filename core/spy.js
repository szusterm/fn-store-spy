const {scheduleJob} = require('node-schedule');

const order = require('../database/factories/order');
const shop = require('./shop');
const messenger = require('./messenger');

class Spy {
	constructor() {
		this._matchingOrders = [];
	}

	run(time) {
		const {hour = 0, minute = 0} = time;

		const cron = `${minute} ${hour} * * *`;

		scheduleJob(cron, async () => await this.check());
	}

	async check() {
		await shop.update();
		await this._updateOrdersMatchingToOffer();

		await this._callActionsInCheckingOrders({
			onEnterOrder: async (userId) => await messenger.sendTemplateMessage(userId, 'ORDER_FOUND'),
			onFindItem: async (userId, fnbrId) => await messenger.sendItemMessage(userId, fnbrId),
			onLeaveOrder: async (userId) => await messenger.sendDonateInfoMessage(userId)
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

			for (const {fnbrId, done} of items) {
				if (!done && shop.fnbrIds.includes(fnbrId)) {
					await onFindItem(userId, fnbrId);
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