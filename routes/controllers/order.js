const order = require('../../database/factories/order');
const code = require('../../core/code');

exports.saveOrder = async (req, res) => {
	const {itemsFnbrIds} = req.body;
	const {err, data} = await order.add(itemsFnbrIds, code.generate());

	if (!err) {
		res.json(data);
	}
	else {
		res.status(500).send(false);
	}
};