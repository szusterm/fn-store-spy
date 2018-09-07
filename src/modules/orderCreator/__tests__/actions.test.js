import * as actions from '../actions';
import * as types from '../actionTypes';
import api from '../../../api';

jest.mock('../../../api');

describe('Order Creator Actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
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