const item = require('../database/factories/item');
const order = require('../database/factories/order');
const code = require('./code');

const callApiRequest = require('../helpers/callApiRequest');
const getRandomNumber = require('../helpers/getRandomNumber');

const botMessages = require('../botMessages');
const config = require('../config');

class Messenger {
	async handle(userId, message) {
		if (code.isCode(message)) {
			const receivedCode = code.removePrefix(message);

			await this._handleCodeMessage(userId, receivedCode);
		}
		else if (this._isStopMessage(message)) {
			const {err} = await order.update().disconnect(userId);

			const responseTemplate = (err) ? 'ERROR' : 'CODE_DISCONNECTED';

			await this.sendTemplateMessage(userId, responseTemplate);
		}
		else {
			await this.sendTemplateMessage(userId, 'NOT_CODE');
			await this.sendUrlInfoMessage(userId);
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
						await this.sendTemplateMessage(userId, 'CONNECTED_CODE');
						await this.sendTemplateMessage(userId, 'REMIND_INFO');
					}
				}
				else {
					await this.sendTemplateMessage(userId, 'BAD_CODE');
				}
			}
			else {
				await this.sendTemplateMessage(userId, 'BAD_CODE');
			}
		}
		else {
			await this.sendTemplateMessage(userId, 'ERROR');
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

	async sendItemMessage(userId, fnbrId) {
		const {err, data} = await item.find().fnbrIds([fnbrId]).exec();

		if (!err) {
			const {name, price} = data.items[0];
			const message = `${name} for ${price}`;

			return await this.sendTextMessage(userId, message);
		}

		return await this.sendTextMessage(userId, 'ERROR');
	}

	async sendUrlInfoMessage(userId) {
		const {siteUrl} = config.general;

		const infoText = this._getRandomMessage('SITE_URL_INFO');
		const message = `${infoText} ${siteUrl}`;

		return await this.sendTextMessage(userId, message);
	}

	_getRandomMessage(messageType = '') {
		if (messageType) {
			const lastTestIndex = botMessages[messageType].length - 1;
			const randomTextIndex = getRandomNumber(lastTestIndex);

			return botMessages[messageType][randomTextIndex];
		}
	}

	_isStopMessage(message) {
		return (message.toLowerCase() === 'stop');
	}
}

module.exports = new Messenger();