const spy = require('../spy');
const orderFactory = require('../../database/factories/order');
const shop = require('../shop');

jest.mock('../../database/factories/order');
jest.mock('../shop');

describe('Spy Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('run()', () => {
		let mockCallFuncAfterFindItemInOrder;
		beforeEach(() => mockCallFuncAfterFindItemInOrder = jest.spyOn(spy, '_callFuncAfterFindItemInOrder'));
		afterEach(() => mockCallFuncAfterFindItemInOrder.mockRestore());

		it('runs spy to get orders matching to current shop', async () => {
			mockCallFuncAfterFindItemInOrder.mockReturnValueOnce(true);

			await spy.run();

			expect(shop.update).toHaveBeenCalledTimes(1);
			expect(mockCallFuncAfterFindItemInOrder).toHaveBeenCalledTimes(1);
		});
	});

	describe('_callFuncAfterFindItemInOrder()', () => {
		let mockGetOrdersMatchingToOffer;
		beforeEach(() => mockGetOrdersMatchingToOffer = jest.spyOn(spy, '_getOrdersMatchingToOffer'));
		afterEach(() => mockGetOrdersMatchingToOffer.mockRestore());

		it('calls a callback after find an offered item in matching orders, if this item is not done', async () => {
			const offeredItemsIds = ['666', '213'];
			const matchingOffers = [
				{
					items: [
						{id: offeredItemsIds[0], done: false},
						{id: '123', done: false}
					]
				},
				{
					items: [
						{id: offeredItemsIds[0], done: true},
						{id: offeredItemsIds[1], done: false}
					]
				}
			];

			const mockCallback = jest.fn();

			shop.ids = offeredItemsIds;
			mockGetOrdersMatchingToOffer.mockReturnValueOnce(matchingOffers);

			await spy._callFuncAfterFindItemInOrder(mockCallback);

			expect(mockCallback).toHaveBeenCalledTimes(2);
		});
	});
});