const order = require('../database/factories/order');
const code = require('./code');
const callApiRequest = require('../helpers/callApiRequest');
const getRandomNumber = require('../helpers/getRandomNumber');
const botMessages = require('../botMessages');

class Messenger {
	async handle(userId, message) {
		if (code.isCode(message)) {
			const receivedCode = code.removePrefix(message);

			await this._handleCodeMessage(userId, receivedCode);
		}
		else {
			await this.sendTemplateMessage(userId, 'notCode');
		}
	}

	async _handleCodeMessage(userId, receivedCode) {
		const {err, data: foundOrders} = await order.find().byCode(receivedCode);

		if (!err) {
			if (foundOrders.length === 1) {
				const singleOrder = foundOrders[0];

				if (singleOrder.used === false) {
					const {err} = await order.update().connect(receivedCode, userId);

					if (!err) {
						await this.sendTextMessage(userId, 'Code connected');
					}
				}
				else {
					await this.sendTemplateMessage(userId, 'badCode');
				}
			}
			else {
				await this.sendTemplateMessage(userId, 'badCode');
			}
		}
		else {
			await this.sendTextMessage(userId, 'I have an error, please wait');
		}
	}

	async sendTextMessage(userId, message) {
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

	async sendTemplateMessage(userId, messageType) {
		const text = this._getRandomMessage(messageType);

		return await this.sendTextMessage(userId, text);
	}

	_getRandomMessage(messageType = '') {
		if (messageType) {
			const lastTestIndex = botMessages[messageType].length - 1;
			const randomTextIndex = getRandomNumber(lastTestIndex);

			return botMessages[messageType][randomTextIndex];
		}
	}
}

module.exports = new Messenger();