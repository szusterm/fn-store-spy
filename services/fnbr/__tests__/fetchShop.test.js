const fetchShop = require('../fetchShop');

const callApiRequest = require('../../../helpers/callApiRequest');

jest.mock('../../../helpers/callApiRequest');

describe('fetchShop()', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('sends request through callApiRequest() to get shop items', async () => {
		await fetchShop();

		expect(callApiRequest).toHaveBeenCalledTimes(1);
	});

	it('returns callApiRequest() response', async () => {
		const exampleResponse = 'resp';

		callApiRequest.mockReturnValueOnce(Promise.resolve(exampleResponse));
		const returnedResponse = await fetchShop();

		expect(returnedResponse).toBe(exampleResponse);
	});
});