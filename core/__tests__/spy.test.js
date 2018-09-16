const spy = require('../spy');
const orderFactory = require('../../database/factories/order');
const shop = require('../shop');

jest.mock('../../database/factories/order');
jest.mock('../shop');

describe('Spy', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('run()', () => {
		let mockSendMessagesToUsersWithMatchingOrders;
		beforeEach(() => mockSendMessagesToUsersWithMatchingOrders = jest.spyOn(spy, '_sendMessagesToUsersWithMatchingOrders'));
		afterEach(() => mockSendMessagesToUsersWithMatchingOrders.mockRestore());

		it('calls shop to update', async () => {
			mockSendMessagesToUsersWithMatchingOrders.mockReturnValueOnce(true);

			await spy.run();

			expect(shop.update).toHaveBeenCalledTimes(1);
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

	describe('_getOrdersMatchingToOffer()', () => {
		it('downloads orders matching to a current offer', async () => {
			const offerItemsIds = ['666'];
			const matchingOrders = [{items: []}, {items: []}];

			shop.ids = offerItemsIds;
			orderFactory.findMatchingByIds.mockReturnValueOnce({err: false, data: matchingOrders});

			const returnedOffers = await spy._getOrdersMatchingToOffer();

			expect(orderFactory.findMatchingByIds).toHaveBeenCalledWith(offerItemsIds);
			expect(returnedOffers).toEqual(matchingOrders);
		});

		it('returns false, if getting from a database has an error', async () => {
			orderFactory.findMatchingByIds.mockReturnValueOnce({err: true, data: {}});

			const response = await spy._getOrdersMatchingToOffer();

			expect(response).toBeFalsy();
		});
	});
});