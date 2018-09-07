const express = require('express');
const router = express.Router();

const itemsController = require('./controllers/items');
const ordersController = require('./controllers/orders');
const configsController = require('./controllers/configs');

router.get('/config', configsController.getConfig);

router.get('/items/get', itemsController.getItems);

router.post('/order/add', ordersController.saveOrder);

module.exports = router;