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

router.get('/count', async (req, res) => {
	const count = await item.count();

	res.json({count});
});

module.exports = router;
