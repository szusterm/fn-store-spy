import axios from 'axios';

import getResponseObject from '../helpers/getResponseObject';
import isRequestSuccessful from '../helpers/isRequestSuccessful';

export const fetchItems = async (data) => {
	const {name, type, page} = data;

	try {
		const response = await axios({
			method: 'get',
			url: '/items/get',
			params: {
				name,
				type,
				page
			}
		});

		const requestSuccessful = isRequestSuccessful(response.status);

		if (requestSuccessful) {
			return getResponseObject(false, response.data);
		}
		else {
			throw new Error();
		}
	}
	catch (error) {
		return getResponseObject(true, error);
	}
};

export const addOrder = async (itemsIds) => {
	try {
		const response = await axios({
			method: 'post',
			url: '/order/add',
			params: {
				itemsIds
			}
		});

		const requestSuccessful = isRequestSuccessful(response.status);

		if (requestSuccessful) {
			return getResponseObject(false, response.data);
		}
		else {
			throw new Error();
		}
	}
	catch (error) {
		return getResponseObject(true, error);
	}
};

export const fetchConfig = async () => {
	try {
		const response = await axios({
			method: 'get',
			url: '/config'
		});

		const requestSuccessful = isRequestSuccessful(response.status);

		if (requestSuccessful) {
			return getResponseObject(false, response.data);
		}
		else {
			throw new Error();
		}
	}
	catch (error) {
		return getResponseObject(true, error);
	}
};