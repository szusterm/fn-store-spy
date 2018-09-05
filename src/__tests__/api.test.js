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

	describe('addOrder()', () => {
		const requestData = {
			method: 'post',
			url: '/order/add',
			data: {
				itemsIds: ['45y5y', '7i7k7k']
			}
		};

		let mockCallApiRequest;
		beforeEach(() => mockCallApiRequest = jest.spyOn(api, 'callApiRequest'));
		afterEach(() => mockCallApiRequest.mockRestore());

		it('sends request through callApiRequest() with items ids', async () => {
			await api.addOrder(requestData.data.itemsIds);

			expect(mockCallApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			mockCallApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.addOrder(requestData.data.itemsIds);

			expect(returnedResponse).toBe(exampleResponse);
		});
	});

	describe('fetchConfig()', () => {
		const requestData = {
			method: 'get',
			url: '/config'
		};

		let mockCallApiRequest;
		beforeEach(() => mockCallApiRequest = jest.spyOn(api, 'callApiRequest'));
		afterEach(() => mockCallApiRequest.mockRestore());

		it('sends request through callApiRequest()', async () => {
			await api.fetchConfig();

			expect(mockCallApiRequest).toHaveBeenCalledWith(requestData);
		});

		it('returns callApiRequest() response', async () => {
			const exampleResponse = 'resp';

			mockCallApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
			const returnedResponse = await api.fetchConfig();

			expect(returnedResponse).toBe(exampleResponse);
		});
	});
});