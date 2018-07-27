const getResponseObject = require('../getResponseObject');

describe('getResponseObject Function', () => {
	it('return response object', () => {
		const someObject = {
			err: false,
			data: {
				isLoggedIn: true
			}
		};

		const response = getResponseObject(someObject.err, someObject.data);

		expect(response).toEqual(someObject);
	});
});