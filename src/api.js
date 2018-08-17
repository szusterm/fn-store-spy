import axios from 'axios';

export const fetchItems = async (data) => {
	const {name, type, page} = data;

	return await axios({
		method: 'get',
		url: '/items/get',
		params: {
			name,
			type,
			page
		}
	});
};

export const fetchConfig = async () => {
	return await axios({
		method: 'get',
		url: '/config'
	});
};