const ItemModel = require('../models/item');

module.exports = async (ids = []) => {
	try {
		if (ids.length > 0) {
			const query = ItemModel.find({
				_id: {
					$in: ids
				}
			});

			return await query.exec();
		}
		else {
			throw new Error();
		}
	}
	catch(error) {
		return false;
	}
};