const code = require('./code');
const callApiRequest = require('../helpers/callApiRequest');

class Messenger {
	async handle(userId, message) {
		if (code.isCode(message)) {
			await this.sendMessage(userId, 'Code');
		}
		else {
			await this.sendMessage(userId, 'Some shit');
		}
	}

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
}

module.exports = new Messenger();