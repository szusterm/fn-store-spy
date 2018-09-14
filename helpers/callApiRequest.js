const getResponseObject = require('./getResponseObject');
const isRequestSuccessful = require('./isRequestSuccessful');
const axios = require('axios/index');

module.exports = async (data) => {
	try {
		const response = await axios(data);

		const requestSuccessful = isRequestSuccessful(response.status);

		if (requestSuccessful) {
			return getResponseObject(false, response.data);
		}
		else {
			throw new Error(response.data);
		}
	}
	catch (error) {
		return getResponseObject(true, error);
	}
};