const codeInstance = require('../code');

describe('Code', () => {
	let code = null;

	beforeEach(() => {
		code = codeInstance;
		jest.clearAllMocks();
	});

	afterEach(() => code = null);
});