const order = require('../database/factories/order');
const code = require('./code');
const callApiRequest = require('../helpers/callApiRequest');

class Messenger {
	async sendMessage(userId, message) {
		const {FB_PAGE_ACCESS_TOKEN} = process.env;
		const url = `https://graph.facebook.com/v2.6/me/messages?access_token=${FB_PAGE_ACCESS_TOKEN}`;

		const data = {
			url,
			method: 'post',
			headers: {'content-type': 'application/json'},
			data: {
				recipient: {id: userId},
				message: {text: message}
			}
		};

		const response = await callApiRequest(data);

		return (!response.err && data.recipient_id);
	}

	async handle(userId, message) {
		if (code.isCode(message)) {
			const receivedCode = code.removePrefix(message);
			const {err, data: foundOrders} = await order.find().byCode(receivedCode);

			if (!err) {
				if (foundOrders.length === 1) {
					const {err} = await order.update().connect(receivedCode, userId);

					if (!err) {
						await this.sendMessage(userId, 'Code connected');
					}
				}
				else {
					await this.sendMessage(userId, 'Bad code');
				}
			}
			else {
				await this.sendMessage(userId, 'I have an error, please wait');
			}
		}
		else {
			await this.sendMessage(userId, 'Some shit');
		}
	}
}

module.exports = new Messenger();