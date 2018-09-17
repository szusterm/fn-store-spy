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
				messaging_type: '',
				recipient: {id: userId},
				message: {test: message}
			}
		};

		const {err} = await callApiRequest(data);

		return !err;
	}
}

module.exports = new Messenger();