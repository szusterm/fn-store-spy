exports.receiveEvent = (req, res) => {
	const body = req.body;

	if(body.object === 'page') {
		for (const entry of body.entry) {
			const webhookEvent = entry.messaging[0];

			if (webhookEvent.message) {
				const {sender: senderId} = webhookEvent;
				const {text} = webhookEvent.message;

				//Process message()
			}
		}

		res.status(200).send('EVENT_RECEIVED');
	}
	else {
		res.sendStatus(404);
	}
};

exports.verify = (req, res) => {
	const {MESSENGER_VERIFY_TOKEN} = process.env;

	const mode = req.query['hub.mode'];
	const token = req.query['hub.verify_token'];
	const challenge = req.query['hub.challenge'];

	if (mode && token) {
		if (mode === 'subscribe' && token === MESSENGER_VERIFY_TOKEN) {
			console.log('Webhook has been verified');

			res.status(200).send(challenge);
		}
		else {
			res.sendStatus(403);
		}
	}
};