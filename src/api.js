import axios from 'axios';

import getResponseObject from '../helpers/getResponseObject';
import isRequestSuccessful from '../helpers/isRequestSuccessful';

export const callApiRequest = async (data) => {
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

export const fetchItems = async (data) => {
	const {name, type, page} = data;

	const requestData = {
		method: 'get',
		url: '/items/get',
		params: {
			name,
			type,
			page
		}
	};

	return await callApiRequest(requestData);
};

export const addOrder = async (itemsIds) => {
	const requestData = {
		method: 'post',
		url: '/order/add',
		params: {
			itemsIds
		}
	};

	return await callApiRequest(requestData);
};

export const fetchConfig = async () => {
	const requestData = {
		method: 'get',
		url: '/config'
	};

	return await callApiRequest(requestData);
};