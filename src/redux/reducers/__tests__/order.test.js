import reducer from '../order';
import * as types from '../../actionTypes';

describe('Order Reducer', () => {
	const initialState = {
		items: ['item0', 'item6']
	};

	describe(types.ADD_ITEM_TO_ORDER, () => {
		it('returns a state with a new item', () => {
			const action = {
				type: types.ADD_ITEM_TO_ORDER,
				payload: 'item3'
			};

			const returnedState = reducer(initialState, action);

			const expectedItems = [...initialState.items, action.payload];

			expect(returnedState).toEqual(expectedItems);
		});
	});

	describe(types.REMOVE_ITEM_FROM_ORDER, () => {
		it('returns a state without a removed item', () => {
			const action = {
				type: types.REMOVE_ITEM_FROM_ORDER,
				payload: 'item6'
			};

			const returnedState = reducer(initialState, action);

			const expectedItems = [initialState.items[0]];

			expect(returnedState).toEqual(expectedItems);
		});
	});

	describe('default', () => {
		it('replaces a whole state', () => {
			const action = {
				type: ''
			};

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(initialState);
		});
	});
});