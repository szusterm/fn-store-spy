import * as api from '../api';
import axios from 'axios';
import getResponseObject from '../../helpers/getResponseObject';
import isRequestSuccessful from '../../helpers/isRequestSuccessful';

jest.mock('axios');
jest.mock('../../helpers/getResponseObject');
jest.mock('../../helpers/isRequestSuccessful');

describe('API', () => {
	describe('fetchItems()', () => {
		const params = {
			name: 'Scout',
			type: 'outfit',
			page: 3
		};

		it('gets items from server', async () => {
			const exampleResponse = {
				status: 200,
				data: ['item0', 'item1']
			};

			axios.mockReturnValueOnce(Promise.resolve(exampleResponse));
			isRequestSuccessful.mockReturnValueOnce(true);

			await api.fetchItems(params);

			expect(getResponseObject).toHaveBeenCalledWith(false, exampleResponse.data);
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

	describe('fetchConfig()', () => {
		it('gets items from server', async () => {
			const exampleResponse = {
				status: 200,
				data: {length: 5, items: 10}
			};

			axios.mockReturnValueOnce(exampleResponse);
			isRequestSuccessful.mockReturnValueOnce(true);

			await api.fetchConfig();

			expect(getResponseObject).toHaveBeenCalledWith(false, exampleResponse.data);
		});
	});
});