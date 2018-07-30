const express = require('express');
const router = express.Router();

const item = require('../models/item');

router.get('/get', async (req, res) => {
	const {name, page, type} = req.params;

	const {err, data} = await item.find()
		.name(name)
		.type(type)
		.page(page)
		.exec();

	res.json((err) ? {err} : {err, data});
});

module.exports = router;
