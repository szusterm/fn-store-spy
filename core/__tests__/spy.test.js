const spyInstance = require('../spy');

const orderFactory = require('../../database/factories/order');
const shop = require('../shop');
const messenger = require('../messenger');

jest.mock('../../database/factories/order');
jest.mock('../shop');
jest.mock('../messenger');

jest.mock('node-schedule', () => ({
	scheduleJob: jest.fn(() => true)
}));

describe('Spy', () => {
	let spy = null;

	beforeEach(() => {
		spy = spyInstance;
		jest.clearAllMocks();
	});

	afterEach(() => {
		spy = null;
	});

	describe('check()', () => {
		beforeEach(() => {
			spy._callActionsInCheckingOrders = jest.fn(() => true);
			spy._updateOrdersMatchingToOffer = jest.fn(() => true);
		});

		it('calls shop to update', async () => {
			await spy.check();

			expect(shop.update).toHaveBeenCalledTimes(1);
		});

		it('calls _updateOrdersMatchingToOffer()', async () => {
			await spy.check();

			expect(spy._updateOrdersMatchingToOffer).toHaveBeenCalledTimes(1);
		});

		it('calls _callActionsInCheckingOrders()', async () => {
			await spy.check();

			expect(spy._callActionsInCheckingOrders).toHaveBeenCalledTimes(1);
		});

		it('puts Messenger() methods as actions to send information to a user', async () => {
			spy._callActionsInCheckingOrders.mockImplementationOnce(async (actions) => {
				await actions.onEnterOrder();
				await actions.onFindItem();
				await actions.onLeaveOrder();
			});

			await spy.check();

			expect(messenger.sendTemplateMessage).toHaveBeenCalledTimes(1);
			expect(messenger.sendItemMessage).toHaveBeenCalledTimes(1);
			expect(messenger.sendDonateInfoMessage).toHaveBeenCalledTimes(1);

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

		it('calls onEnterOrder() from actions param after start checking the next order', async () => {
			const mockOnEnterOrder = jest.fn();

			await spy._callActionsInCheckingOrders({onEnterOrder: mockOnEnterOrder});

			expect(mockOnEnterOrder).toHaveBeenCalledTimes(2);
		});

		it('calls onFindItem() from actions param after find a matching item in the order', async () => {
			const mockOnFindItem = jest.fn();

			await spy._callActionsInCheckingOrders({onFindItem: mockOnFindItem});

			expect(mockOnFindItem).toHaveBeenCalledTimes(2);
		});

		it('calls onLeaveOrder() from actions param after end checking items in a single user', async () => {
			const mockOnLeaveOrder = jest.fn();

			await spy._callActionsInCheckingOrders({onLeaveOrder: mockOnLeaveOrder});

			expect(mockOnLeaveOrder).toHaveBeenCalledTimes(2);
		});
	});

	describe('_updateOrdersMatchingToOffer()', () => {
		it('updates _matchingOrders to orders matching to a current offer', async () => {
			const offerItemsFnbrIds = ['666'];
			const matchingOrders = [{items: []}, {items: []}];

			shop.fnbrIds = offerItemsFnbrIds;
			orderFactory
				.find()
				.matchingByFnbrIds
				.mockReturnValueOnce(Promise.resolve({err: false, data: matchingOrders}));

			await spy._updateOrdersMatchingToOffer();

			expect(orderFactory.find().matchingByFnbrIds).toHaveBeenCalledWith(offerItemsFnbrIds);
			expect(spy._matchingOrders).toEqual(matchingOrders);
		});

		it('updates _matchingOrders to an empty array, if it is an error in getting orders', async () => {
			orderFactory.find().matchingByFnbrIds.mockReturnValueOnce({err: true, data: {}});

			await spy._updateOrdersMatchingToOffer();

			expect(spy._matchingOrders).toEqual([]);
		});
	});
});