const express = require('express');
const router = express.Router();

const order = require('../models/order');

router.post('/add', async (req, res) => {
	const {items} = req.body;
	const dbResponse = await order.add(items, 'code');

	res.json(dbResponse);
});

module.exports = router;
