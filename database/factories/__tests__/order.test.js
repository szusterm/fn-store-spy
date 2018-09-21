const orderInstance = require('../../factories/order');

const OrderModel = require('../../models/order.model');
const itemFactory = require('../item');
const getResponseObject = require('../../../helpers/getResponseObject');
const config = require('../../../config');

jest.mock('../item');
jest.mock('../../../helpers/getResponseObject');
jest.mock('../../../config', () => ({
	ordering: {
		maxItemsInOrder: 3
	}
}));

const mockOrderModel = {
	save: jest.fn(),
	find: jest.fn(),
	exec: jest.fn()
};
jest.mock('../../models/order.model', () => {
	return jest.fn().mockImplementation(() => {
		return {
			save: mockOrderModel.save,
			find: mockOrderModel.find,
			exec: mockOrderModel.exec
		};
	});
});

describe('Order Factory', () => {
	let order;

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

		it('adds new order to a database', async () => {
			await order.add(itemsIds, code);

			expect(OrderModel).toHaveBeenCalledWith({
				code,
				connected: false,
				items: itemsIdsToSave
			});
			expect(mockOrderModel.save).toHaveBeenCalledTimes(1);
		});

		it('returns an object with occurrence of an error and response data', async () => {
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

	xdescribe('findMatchingByIds()', () => {
		const itemsIds = ['123', '666'];

		it('finds orders with matching items ids', async () => {
			const orders = ['order-1', 'order-2'];

			mockOrderModel.exec.mockReturnValueOnce(Promise.resolve(orders));

			await order.findMatchingByIds(itemsIds);

			expect(OrderModel).toHaveBeenCalledTimes(1);
			expect(mockOrderModel.find).toHaveBeenCalledWith({
				'items.id': {$in: itemsIds}
			});
			expect(mockOrderModel.exec).toHaveBeenCalledTimes(1);
		});
	});

	describe('_areFnbrIdsCorrect()', () => {
		it('returns true if param fnbrIds length equals to got matching items', async () => {
			const fnbrIds = ['item0'];

			const matchingResponse = {
				err: false,
				data: {
					items: ['item0']
				}
			};

			const mismatchingResponse = {
				err: false,
				data: {
					items: ['item0', 'item2']
				}
			};

			itemFactory.exec.mockReturnValueOnce(Promise.resolve(matchingResponse));
			itemFactory.exec.mockReturnValueOnce(Promise.resolve(mismatchingResponse));

			expect(await order._areFnbrIdsCorrect(fnbrIds)).toBe(true);
			expect(await order._areFnbrIdsCorrect(fnbrIds)).toBe(false);
		});

		it('returns false if getting items returns err true', async () => {
			const responseWithError = {
				err: true,
				data: {}
			};

			itemFactory.exec.mockReturnValueOnce(Promise.resolve(responseWithError));

			expect(await order._areFnbrIdsCorrect([])).toBe(false);
		});
	});

	describe('_isArrayWithCorrectLength()', () => {
		it('returns true if fnbrIds is an array', () => {
			expect(order._isArrayWithCorrectLength(['thing'])).toBe(true);
			expect(order._isArrayWithCorrectLength('some string')).toBe(false);
			expect(order._isArrayWithCorrectLength(2137)).toBe(false);
			expect(order._isArrayWithCorrectLength({meme: false})).toBe(false);
		});

		it('returns true if fnbrIds array length is longer than 0 or shorter than max', () => {
			const ideal = ['someId', 'differentId'];
			const empty = [];
			const tooLong = ['a', 'b', 'c', 'd', 'e'];

			expect(order._isArrayWithCorrectLength(ideal)).toBe(true);
			expect(order._isArrayWithCorrectLength(empty)).toBe(false);
			expect(order._isArrayWithCorrectLength(tooLong)).toBe(false);
		});
	});

	describe('_createItemsArray()', () => {
		it('returns items array ready to add to an order', () => {
			const itemsIds = ['123', '666'];
			const readyItemsIds = [
				{fnbrId: itemsIds[0], done: false},
				{fnbrId: itemsIds[1], done: false}
			];

			const returnedItemsArray = order._createItemsArray(itemsIds);

			expect(returnedItemsArray).toEqual(readyItemsIds);
		});
	});
});