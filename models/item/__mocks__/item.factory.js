const item = {
	find: jest.fn().mockReturnValue(this),
	exec: jest.fn().mockReturnValue(this),
	names: jest.fn().mockReturnValue(this)
};

module.exports = item;