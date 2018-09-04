const isRequestSuccessful = require('../isRequestSuccessful');

describe('isRequestSuccessful()', () => {
	it('returns true if request was successful', () => {
		const statusCodes = {
			success: 200,
			error: 500
		};

		expect(isRequestSuccessful(statusCodes.success)).toBe(true);
		expect(isRequestSuccessful(statusCodes.error)).toBe(false);
	});
});