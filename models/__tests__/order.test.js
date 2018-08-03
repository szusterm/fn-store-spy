const orderInstance = require('../order');
const OrderModel = require('../order/order.model');
const getResponseObject = require('../../helpers/getResponseObject');

jest.mock('../../helpers/getResponseObject', () => jest.fn());

const mockOrderModel = {
	save: jest.fn(),
	find: jest.fn(),
	exec: jest.fn()
};
jest.mock('../order/order.model', () => {
	return jest.fn().mockImplementation(() => {
		return {
			save: mockOrderModel.save,
			find: mockOrderModel.find,
			exec: mockOrderModel.exec
		};
	});
});

let order;

describe('Order Factory', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		order = orderInstance;
	});

	afterEach(() => {
		order = null;
	});

	describe('add()', () => {
		const itemsIds = ['123', '666'];
		const itemsIdsToSave = [
			{id: itemsIds[0], done: false},
			{id: itemsIds[1], done: false}
		];
		const code = 'fn23d';
		let createItemsArray;

		beforeEach(() => {
			createItemsArray = jest
				.spyOn(order, '_createItemsArray')
				.mockReturnValue(itemsIdsToSave);
		});
		afterEach(() => createItemsArray.mockRestore());

		it('adds new order to database', async () => {
			await order.add(itemsIds, code);

			expect(OrderModel).toHaveBeenCalledWith({
				code,
				connected: false,
				items: itemsIdsToSave
			});
			expect(mockOrderModel.save).toHaveBeenCalledTimes(1);
		});

		it('returns object with occurrence of an error and response data', async () => {
			const returnedError = 'error';

			mockOrderModel.save
				.mockReturnValueOnce(Promise.resolve())
				.mockReturnValueOnce(Promise.reject(returnedError));


			await order.add(itemsIds, code);
			expect(getResponseObject).toHaveBeenCalledWith(false, {code, items: itemsIdsToSave});

			await order.add(itemsIds, code);
			expect(getResponseObject).toHaveBeenCalledWith(true, returnedError);
		});
	});
});