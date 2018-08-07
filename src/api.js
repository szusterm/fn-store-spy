import axios from 'axios';

export const getItems = async (data) => {
	const {name, type, page} = data;

	return await axios({
		method: 'get',
		url: '/items/get',
		data: {
			name,
			type,
			page
		}
	});
};