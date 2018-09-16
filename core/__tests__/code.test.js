const codeInstance = require('../code');

describe('Code', () => {
	let code = null;

	beforeEach(() => {
		code = codeInstance;
		jest.clearAllMocks();
	});

	afterEach(() => code = null);

	describe('_getRandomChar()', () => {
		let mockGetRandomNumber;
		beforeEach(() => mockGetRandomNumber = jest.spyOn(code, '_getRandomNumber'));
		afterEach(() => mockGetRandomNumber.mockRestore());

		it('returns random char from an available collection', () => {
			code._availableChars = 'abc';

			const returnedChar = code._getRandomChar();

			expect(mockGetRandomNumber).toHaveBeenCalledWith(2);
			expect(returnedChar).toBe('b');
		});
	});

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