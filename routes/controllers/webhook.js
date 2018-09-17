exports.receiveEvent = (req, res) => {
	const body = req.body;

	if(body.object === 'page') {
		for (const entry of body.entry) {
			const webhook_event = entry.messaging[0];
			console.log(webhook_event);
		}

		res.status(200).send('EVENT_RECEIVED');
	}
	else {
		res.sendStatus(404);
	}
};