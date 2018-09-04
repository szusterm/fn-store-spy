import api from '../api';
import axios from 'axios';
import getResponseObject from '../../helpers/getResponseObject';
import isRequestSuccessful from '../../helpers/isRequestSuccessful';

jest.mock('axios');
jest.mock('../../helpers/getResponseObject');
jest.mock('../../helpers/isRequestSuccessful');

describe('API', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('callApiRequest()', () => {
		const exampleRequestData = {
			method: 'get',
			url: '/',
			params: 'some params'
		};

		it('calls request with a passed data', async () => {
			await api.callApiRequest(exampleRequestData);

			expect(axios).toHaveBeenCalledWith(exampleRequestData);
		});

		it('returns an object with err false and response data, if it is no error', async () => {
			const exampleResponse = {
				status: 200,
				data: 'example data'
			};

			axios.mockReturnValueOnce(Promise.resolve(exampleResponse));
			isRequestSuccessful.mockReturnValueOnce(true);

			await api.callApiRequest(exampleRequestData);

			expect(getResponseObject).toHaveBeenCalledWith(false, exampleResponse.data);
		});

		it('returns an object with err true and error data, if it is error', async () => {
			const exampleErrorResponse = {
				status: 500,
				data: 'example error'
			};

			axios.mockReturnValueOnce(Promise.resolve(exampleErrorResponse));
			isRequestSuccessful.mockReturnValueOnce(false);
			await api.callApiRequest(exampleRequestData);

			expect(getResponseObject).toHaveBeenCalledWith(true, exampleErrorResponse.data);

			axios.mockReturnValueOnce(Promise.reject(exampleErrorResponse));
			isRequestSuccessful.mockReturnValueOnce(false);
			await api.callApiRequest(exampleRequestData);

			expect(getResponseObject).toHaveBeenCalledWith(true, exampleErrorResponse.data);
		});
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

		let mockCallApiRequest;
		beforeEach(() => mockCallApiRequest = jest.spyOn(api, 'callApiRequest'));
		afterEach(() => mockCallApiRequest.mockRestore());

		it('sends request through callApiRequest() with filters', async () => {
			await api.fetchItems(requestData.params);

			expect(mockCallApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			mockCallApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.fetchItems(requestData.params);

			expect(returnedResponse).toBe(exampleResponse);
		});
	});

	xdescribe('fetchItems()', () => {
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

		it('calls request with data', async () => {
			const dataCalledWithAxios = {
				method: 'get',
				url: '/items/get',
				params
			};

			await api.fetchItems(params);

			expect(axios).toHaveBeenCalledWith(dataCalledWithAxios);
		});
	});

	xdescribe('addOrder()', () => {
		const params = {
			itemsIds: ['458y7h45', '45hg8r']
		};

		it('sends an order to save in a database', async () => {
			const exampleResponse = {
				status: 200,
				data: 'example data'
			};

			axios.mockReturnValueOnce(Promise.resolve(exampleResponse));
			isRequestSuccessful.mockReturnValueOnce(true);

			await api.addOrder(params.itemsIds);

			expect(getResponseObject).toHaveBeenCalledWith(false, exampleResponse.data);
		});

		it('calls request with ordered items ids', async () => {
			const dataCalledWithAxios = {
				method: 'post',
				url: '/order/add',
				params
			};

			await api.addOrder(params.itemsIds);

			expect(axios).toHaveBeenCalledWith(dataCalledWithAxios);
		});
	});

	xdescribe('fetchConfig()', () => {
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