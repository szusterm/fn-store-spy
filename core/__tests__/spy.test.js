const spyInstance = require('../spy');
const orderFactory = require('../../database/factories/order');
const shop = require('../shop');

jest.mock('../../database/factories/order');
jest.mock('../shop');

describe('Spy', () => {
	let spy = null;

	beforeEach(() => {
		spy = spyInstance;
		jest.clearAllMocks();
	});

	afterEach(() => {
		spy = null;
	});

	describe('run()', () => {
		let mockCallActionsInCheckingOrders;
		let mockUpdateOrdersMatchingToOffer;
		beforeEach(() => {
			mockCallActionsInCheckingOrders = jest.spyOn(spy, '_callActionsInCheckingOrders');
			mockUpdateOrdersMatchingToOffer = jest.spyOn(spy, '_updateOrdersMatchingToOffer');

			mockCallActionsInCheckingOrders.mockImplementationOnce(() => true);
			mockUpdateOrdersMatchingToOffer.mockImplementationOnce(() => true);
		});
		afterEach(() => {
			mockCallActionsInCheckingOrders.mockRestore();
			mockUpdateOrdersMatchingToOffer.mockRestore();
		});

		it('calls shop to update', async () => {
			await spy.run();

			expect(shop.update).toHaveBeenCalledTimes(1);
		});

		it('calls _updateOrdersMatchingToOffer()', async () => {
			await spy.run();

			expect(mockUpdateOrdersMatchingToOffer).toHaveBeenCalledTimes(1);
		});

		it('calls _callActionsInCheckingOrders()', async () => {
			await spy.run();

			expect(mockCallActionsInCheckingOrders).toHaveBeenCalledTimes(1);
		});
	});

	describe('_callActionsInCheckingOrders()', () => {
		const offers = [
			{
				items: [
					{fnbrId: '345y5y5', done: false}, //in store
					{fnbrId: '698ju69', done: false},
					{fnbrId: '324r34r', done: true} //in store
				]
			},
			{
				items: [
					{fnbrId: '53ty345', done: false}, //in store
					{fnbrId: '23rd34t', done: true}
				]
			}
		];

		beforeEach(() => {
			spy._matchingOrders = offers;
			shop.fnbrIds = [
				offers[0].items[0].fnbrId,
				offers[0].items[2].fnbrId,
				offers[1].items[0].fnbrId
			];
		});

		it('calls onFindUser() from actions param after start checking the next order', async () => {
			const mockOnFindUser = jest.fn();

			await spy._callActionsInCheckingOrders({onFindUser: mockOnFindUser});

			expect(mockOnFindUser).toHaveBeenCalledTimes(2);
		});

		it('calls onFindItem() from actions param after find a matching item in the order', async () => {
			const mockOnFindItem = jest.fn();

			await spy._callActionsInCheckingOrders({onFindItem: mockOnFindItem});

			expect(mockOnFindItem).toHaveBeenCalledTimes(2);
		});

		it('calls onLeaveUser() from actions param after end checking items in a single user', async () => {
			const mockOnLeaveUser = jest.fn();

			await spy._callActionsInCheckingOrders({onLeaveUser: mockOnLeaveUser});

			expect(mockOnLeaveUser).toHaveBeenCalledTimes(2);
		});
	});

	describe('_updateOrdersMatchingToOffer()', () => {
		it('updates _matchingOrders to orders matching to a current offer', async () => {
			const offerItemsFnbrIds = ['666'];
			const matchingOrders = [{items: []}, {items: []}];

			shop.fnbrIds = offerItemsFnbrIds;
			orderFactory.findMatchingByFnbrIds.mockReturnValueOnce({err: false, data: matchingOrders});

			await spy._updateOrdersMatchingToOffer();

			expect(orderFactory.findMatchingByFnbrIds).toHaveBeenCalledWith(offerItemsFnbrIds);
			expect(spy._matchingOrders).toEqual(matchingOrders);
		});

		it('updates _matchingOrders to an empty array, if it is an error in getting orders', async () => {
			orderFactory.findMatchingByFnbrIds.mockReturnValueOnce({err: true, data: {}});

			await spy._updateOrdersMatchingToOffer();

			expect(spy._matchingOrders).toEqual([]);
		});
	});
});