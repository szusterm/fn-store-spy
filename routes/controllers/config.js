const config = require('../../config');

exports.getConfig = (req, res) => {
	const {general, ordering, searching} = config;

	const mergedConfig = {
		...general,
		...ordering,
		...searching
	};

	res.json(mergedConfig);
};

