const config = require('../../config');

exports.getConfig = (req, res) => {
	const {ordering, searching} = config;

	const mergedConfig = {
		...ordering,
		...searching
	};

	res.json(mergedConfig);
};

