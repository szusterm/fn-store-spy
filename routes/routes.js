const express = require('express');
const router = express.Router();

const itemsController = require('./controllers/items');
const orderController = require('./controllers/order');
const configController = require('./controllers/config');

router.get('/config', configController.getConfig);

router.get('/items/get', itemsController.getItems);

router.post('/order/add', orderController.saveOrder);

module.exports = router;