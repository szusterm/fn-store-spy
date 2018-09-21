import * as api from '../api';

import callApiRequest from '../../helpers/callApiRequest';

jest.mock('../../helpers/callApiRequest');

describe('API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('fetchItems()', () => {
		const requestData = {
			method: 'get',
			url: '/items/get',
			params: {
				name: 'Item',
				type: 'outfit',
				page: 5
			}
		};

		it('sends request through callApiRequest() with filters', async () => {
			await api.fetchItems(requestData.params);

			expect(callApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			callApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.fetchItems(requestData.params);

			expect(returnedResponse).toBe(exampleResponse);
		});
	});

	describe('addOrder()', () => {
		const requestData = {
			method: 'post',
			url: '/order/add',
			data: {
				itemsFnbrIds: ['45y5y', '7i7k7k']
			}
		};

		it('sends request through callApiRequest() with items ids', async () => {
			await api.addOrder(requestData.data.itemsFnbrIds);

			expect(callApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			callApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.addOrder(requestData.data.itemsIds);

			expect(returnedResponse).toBe(exampleResponse);
		});
	});

	describe('fetchConfig()', () => {
		const requestData = {
			method: 'get',
			url: '/config'
		};

		it('sends request through callApiRequest()', async () => {
			await api.fetchConfig();

			expect(callApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			callApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.fetchConfig();

			expect(returnedResponse).toBe(exampleResponse);
		});
	});
});