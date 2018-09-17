const messenger = require('../../core/messenger');

exports.receiveEvent = async (req, res) => {
	const body = req.body;

	if(body.object === 'page') {
		for (const entry of body.entry) {
			const webhookEvent = entry.messaging[0];

			if (webhookEvent.message) {
				if (webhookEvent.message.text) {
					const {id: userId} = webhookEvent.sender;
					const {text} = webhookEvent.message;

					await messenger.sendMessage(userId, 'It works!');
				}
			}
		}

		res.status(200).send('EVENT_RECEIVED');
	}
	else {
		res.sendStatus(404);
	}
};

exports.verify = (req, res) => {
	const {FB_PAGE_ACCESS_TOKEN} = process.env;

	const mode = req.query['hub.mode'];
	const token = req.query['hub.verify_token'];
	const challenge = req.query['hub.challenge'];

	if (mode && token) {
		if (mode === 'subscribe' && token === FB_PAGE_ACCESS_TOKEN) {
			console.log('Webhook has been verified');

			res.status(200).send(challenge);
		}
		else {
			res.sendStatus(403);
		}
	}
};