const item = {
	find: jest.fn(() => item),
	exec: jest.fn(() => item),
	ids: jest.fn(() => item),
	name: jest.fn(() => item),
	names: jest.fn(() => item),
	type: jest.fn(() => item),
	page: jest.fn(() => item)
};

module.exports = item;