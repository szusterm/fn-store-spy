const callApiRequest = require('../../helpers/callApiRequest');

const endpoints = require('./endpoints');

const headers = {'x-api-key': process.env.FNBR_API_KEY};

exports.fetchShop = async () => await callApiRequest({
	method: 'get',
	url: endpoints.shop,
	headers
});