import callApiRequest from '../helpers/callApiRequest';

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

export const addOrder = async (itemsFnbrIds) => {
	const requestData = {
		method: 'post',
		url: '/order/add',
		data: {
			itemsFnbrIds
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