const express = require('express');
const router = express.Router();

const order = require('../database/factories/order');

router.post('/add', async (req, res) => {
	const {itemsIds} = req.body;
	const {err, data} = await order.add(itemsIds, 'fn4rt7');

	if (!err) {
		res.json(data);
	}
	else {
		res.status(500).send(false);
	}
});

module.exports = router;
