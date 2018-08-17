const express = require('express');
const router = express.Router();

const clientConfig = require('../config/client');

router.get('/config', (req, res) => res.json(clientConfig));

module.exports = router;