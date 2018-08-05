const item = {
	find: jest.fn(() => item),
	exec: jest.fn(() => item),
	names: jest.fn(() => item)
};

module.exports = item;