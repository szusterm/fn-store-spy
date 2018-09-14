const api = require('../../services/fnbr/api');
const axios = require('axios');
const getResponseObject = require('../getResponseObject');
const isRequestSuccessful = require('../isRequestSuccessful');

jest.mock('axios');
jest.mock('../../helpers/getResponseObject');
jest.mock('../../helpers/isRequestSuccessful');

describe('callApiRequest()', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

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