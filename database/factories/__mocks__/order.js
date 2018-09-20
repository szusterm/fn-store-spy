const order = {
	add: jest.fn(() => true),
	update: jest.fn(() => ({
		connect: jest.fn(() => true),
		disconnect: jest.fn(() => true)
	})),
	find: jest.fn(() => ({
		byCode: jest.fn(() => true),
		matchingByFnbrIds: jest.fn(() => true)
	}))
};

module.exports = order;