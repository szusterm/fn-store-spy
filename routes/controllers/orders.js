const order = require('../../database/factories/order');

exports.saveOrder = async (req, res) => {
	const {itemsFnbrIds} = req.body;
	const {err, data} = await order.add(itemsFnbrIds, 'fn4rt7');

	if (!err) {
		res.json(data);
	}
	else {
		res.status(500).send(false);
	}
};