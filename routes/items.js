const express = require('express');
const router = express.Router();

const item = require('../models/item');

router.get('/get/:page/:type/:name', async (req, res) => {
	const {name, page, type} = req.params;

	res.json(req.params);
});

module.exports = router;
