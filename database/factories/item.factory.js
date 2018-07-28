const ItemModel = require('../models/item');
const getObject = require('../../helpers/getResponseObject');

class Item {
	async find(data) {
		try {
			const query = ItemModel.find(data);
			const response = await query.exec();

			return getObject(false, response);
		}
		catch (error) {
			return getObject(true, error);
		}
	}

	async findById(ids) {
		const data = {
			_id: {$in: ids}
		};

		return await this.find(data);
	}

	async findByName(names) {
		const data = {
			name: {$in: names}
		};

		return await this.find(data);
	}
}

module.exports = new Item();