const itemModel = {
	exec: jest.fn(() => itemModel),
	find: jest.fn(() => itemModel),
	where: jest.fn(() => itemModel),
	equals: jest.fn(() => itemModel),
	in: jest.fn(() => itemModel),
	limit: jest.fn(() => itemModel),
	skip: jest.fn(() => itemModel)
};

module.exports = itemModel;