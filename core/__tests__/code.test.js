const codeInstance = require('../code');
const getRandomNumber = require('../../helpers/getRandomNumber');
const config = require('../../config');

jest.mock('../../helpers/getRandomNumber');
jest.mock('../../config', () => ({
	ordering: {
		codePrefix: 'fn',
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
		it('returns random char from an available collection', () => {
			code._availableChars = 'abc';

			getRandomNumber.mockReturnValueOnce(1);

			const returnedChar = code._getRandomChar();

			expect(getRandomNumber).toHaveBeenCalledWith(2);
			expect(returnedChar).toBe('b');
		});
	});

	describe('isCode()', () => {
		it('returns true/false if a param is the code', () => {
			const exampleCodes = [
				'fnde5h', //code
				'fndrt8', //code
				'FnsUi3', //code
				'FN234d', //code
				'ds45th',
				'd',
				'fn',
				'fner',
				'fn34t34g'
			];

			let trueCodesLength = 0;

			for (const singleCode of exampleCodes) {
				if (code.isCode(singleCode)) {
					trueCodesLength++;
				}
			}

			expect(trueCodesLength).toBe(4);
		});
	});
});