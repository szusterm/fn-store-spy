const express = require('express');
const router = express.Router();

const item = require('../database/factories/item');

router.get('/get', async (req, res) => {
	const name = req.param('name');
	const type = req.param('type');
	const page = Number(req.param('page'));

	const {err, data} = await item.find()
		.name(name)
		.type(type)
		.page(page)
		.exec();

	res.json((err) ? {err} : {err, data});
});

module.exports = router;
