const getRandomNumber = require('../getRandomNumber');

describe('getRandomNumber()', () => {
	it('returns random number between 0 and number in param', () => {
		const firstRandom = getRandomNumber(10000000);
		const secondRandom = getRandomNumber(10000000);

		expect(firstRandom).not.toBe(secondRandom);
	});

	it('returns rounded number', () => {
		const random = getRandomNumber(1);

		expect((random === 0 || random === 1)).toBe(true);
	});
});