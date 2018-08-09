const express = require('express');
const router = express.Router();

const item = require('../database/factories/item');

router.get('/get', async (req, res) => {
	const {name, type, page} = req.query;

	const {err, data} = await item.find()
		.name(name)
		.type(type)
		.page(Number(page))
		.exec();

	res.json((err) ? {err} : {err, data});
});

router.get('/stats', async (req, res) => {
	const stats = await item.getStats();

	res.json(stats);
});

module.exports = router;
