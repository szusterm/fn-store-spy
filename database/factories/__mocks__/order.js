const order = {
	add: jest.fn(() => true),
	update: jest.fn(() => order),
	find: jest.fn(() => order),

	//Below methods returned by update()
	connect: jest.fn(() => true),
	disconnect: jest.fn(() => true),

	//Below methods returned by find()
	byCode: jest.fn(() => true),
	matchingByFnbrIds: jest.fn(() => true)
};

module.exports = order;