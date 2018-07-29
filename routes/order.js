const express = require('express');
const router = express.Router();

router.post('/', (req, res, next) => {
	console.log('It is me');
});

module.exports = router;
