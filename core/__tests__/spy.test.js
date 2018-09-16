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
		let mockCallActionsInCheckingOrders;
		beforeEach(() => mockCallActionsInCheckingOrders = jest.spyOn(spy, '_callActionsInCheckingOrders'));
		afterEach(() => mockCallActionsInCheckingOrders.mockRestore());

		it('calls shop to update', async () => {
			mockCallActionsInCheckingOrders.mockReturnValueOnce(true);

			await spy.run();

			expect(shop.update).toHaveBeenCalledTimes(1);
		});

		it('calls _sendMessagesToUsersWithMatchingOrders()', async () => {
			await spy.run();

			expect(mockCallActionsInCheckingOrders).toHaveBeenCalledTimes(1);
		});
	});

	describe('_sendMessagesToUsersWithMatchingOrders()', () => {

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


			expect(mockCallback).toHaveBeenCalledTimes(2);
		});
	});

	describe('_getOrdersMatchingToOffer()', () => {
		it('downloads orders matching to a current offer', async () => {
			const offerItemsFnbrIds = ['666'];
			const matchingOrders = [{items: []}, {items: []}];

			shop.fnbrIds = offerItemsFnbrIds;
			orderFactory.findMatchingByFnbrIds.mockReturnValueOnce({err: false, data: matchingOrders});

			const returnedOffers = await spy._getOrdersMatchingToOffer();

			expect(orderFactory.findMatchingByFnbrIds).toHaveBeenCalledWith(offerItemsFnbrIds);
			expect(returnedOffers).toEqual(matchingOrders);
		});

		it('returns false, if getting from a database has an error', async () => {
			orderFactory.findMatchingByFnbrIds.mockReturnValueOnce({err: true, data: {}});

			const response = await spy._getOrdersMatchingToOffer();

			expect(response).toBeFalsy();
		});
	});
});