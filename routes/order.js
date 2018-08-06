const express = require('express');
const router = express.Router();

const order = require('../database/factories/order');

router.post('/add', async (req, res) => {
	const {items} = req.body;
	const {err, data} = await order.add(items, 'code');

	res.json((err) ? {err} : {err, data});
});

module.exports = router;
