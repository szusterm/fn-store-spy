const codeInstance = require('../code');
const config = require('../../config');

jest.mock('../../config', () => ({
	ordering: {
		codeLength: 4
	}
}));

describe('Code', () => {
	let code = null;

	beforeEach(() => {
		code = codeInstance;
		jest.clearAllMocks();
	});

	afterEach(() => code = null);

	describe('generate()', () => {
		let mockGetRandomChar;
		beforeEach(() => mockGetRandomChar = jest.spyOn(code, '_getRandomChar'));
		afterEach(() => mockGetRandomChar.mockRestore());

		it('returns a random code with a specified length', () => {
			mockGetRandomChar.mockReturnValue('c');

			const generatedCode = code.generate();

			expect(generatedCode).toBe('cccc');
		});
	});

	describe('_getRandomChar()', () => {
		let mockGetRandomNumber;
		beforeEach(() => mockGetRandomNumber = jest.spyOn(code, '_getRandomNumber'));
		afterEach(() => mockGetRandomNumber.mockRestore());

		it('returns random char from an available collection', () => {
			code._availableChars = 'abc';

			mockGetRandomNumber.mockReturnValueOnce(1);

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