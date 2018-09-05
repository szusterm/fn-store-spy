import * as actions from '../actions';
import * as types from '../actionTypes';
import api from '../../../api';

jest.mock('../../../api');

describe('Order Actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('sendOrder()', () => {
		const itemsIds = ['34rc3', '567uh'];
		const apiResponseWithError = {
			err: true,
			data: 'error message'
		};
		const apiResponseWithoutError = {
			err: false,
			data: 'code'
		};
		const mockDispatch = jest.fn();

		it('calls api function to send ordered items', async () => {
			api.addOrder.mockReturnValueOnce(Promise.resolve(apiResponseWithoutError));

			await actions.sendOrder(itemsIds)(mockDispatch);

			expect(api.addOrder).toHaveBeenCalledWith(itemsIds);
		});

		it('open the order confirmation, if it is no error after getting response', async () => {
			api.addOrder
				.mockReturnValueOnce(Promise.resolve(apiResponseWithoutError))
				.mockReturnValueOnce(Promise.resolve(apiResponseWithError));

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledWith({
				type: types.SHOW_ORDER_CONFIRMATION
			});

			await actions.sendOrder(itemsIds)(mockDispatch);
			expect(mockDispatch).toHaveBeenCalledTimes(0);
		});
	});

	describe('addItemToOrder()', () => {
		it('calls reducer to add an item', () => {
			const expectedChange = {
				type: types.ADD_ITEM,
				payload: 'item7'
			};

			const returnedChange = actions.addItemToOrder(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('removeItemFromOrderByIndex()', () => {
		it('calls reducer to add an item', () => {
			const expectedChange = {
				type: types.REMOVE_ITEM_BY_INDEX,
				payload: 3
			};

			const returnedChange = actions.removeItemFromOrderByIndex(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('openOrderList()', () => {
		it('calls reducer open the order list', () => {
			const expectedChange = {
				type: types.OPEN_ORDER_LIST
			};

			const returnedChange = actions.openOrderList(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('closeOrderList()', () => {
		it('calls reducer close the order list', () => {
			const expectedChange = {
				type: types.CLOSE_ORDER_LIST
			};

			const returnedChange = actions.closeOrderList(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});
});