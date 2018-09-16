const codeInstance = require('../code');

describe('Code', () => {
	let code = null;

	beforeEach(() => {
		code = codeInstance;
		jest.clearAllMocks();
	});

	afterEach(() => code = null);

	describe('_getRandomNumber', () => {
		it('returns random number between 0 and number in param', () => {
			const firstRandom = code._getRandomNumber(10000000);
			const secondRandom = code._getRandomNumber(10000000);

			expect(firstRandom).not.toBe(secondRandom);
		});

		it('returns rounded number', () => {
			const random = code._getRandomNumber(1);

			expect((random === 0 || random === 1)).toBe(true);
		});
	});
});