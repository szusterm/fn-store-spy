import * as api from '../api';
import axios from 'axios';

jest.mock('axios');

describe('fetchItems()', () => {
	const params = {
		name: 'Scout',
		type: 'outfit',
		page: 3
	};

	it('gets items from server', async () => {
		const items = ['item0', 'item1'];

		axios.mockReturnValueOnce(items);

		const response = await api.fetchItems(params);

		expect(response).toEqual(items);
	});

	it('call request with data', async () => {
		const dataCalledWithAxios = {
			method: 'get',
			url: '/items/get',
			params
		};

		await api.fetchItems(params);

		expect(axios).toHaveBeenCalledWith(dataCalledWithAxios);
	});
});