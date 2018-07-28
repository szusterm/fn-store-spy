const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
	console.log('It is me');
});

module.exports = router;
