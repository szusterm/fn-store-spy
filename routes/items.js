const express = require('express');
const router = express.Router();

const item = require('../database/factories/item');

router.get('/get', async (req, res) => {
	const {name, type, page} = req.query;

	const {err, data} = await item.find()
		.name(name)
		.type(type)
		.page(page)
		.exec();

	if (!err) {
		res.json(data);
	}
	else {
		res.status(500).send(false);
	}
});

module.exports = router;
