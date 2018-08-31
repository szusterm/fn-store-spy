import reducer from '../reducer';
import * as types from '../../../redux/actionTypes';

describe('Order Reducer', () => {
	const initialState = {
		items: ['item0', 'item6'],
		listOpened: false
	};

	describe(types.ADD_ITEM_TO_ORDER, () => {
		it('returns a state with a new item', () => {
			const action = {
				type: types.ADD_ITEM_TO_ORDER,
				payload: 'item3'
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {
				...initialState,
				items: [...initialState.items]
			};
			expectedState.items.push(action.payload);

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.REMOVE_ITEM_FROM_ORDER_BY_INDEX, () => {
		it('returns a state without an item removed by id', () => {
			const action = {
				type: types.REMOVE_ITEM_FROM_ORDER_BY_INDEX,
				payload: 1
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.items = [initialState.items[0]];

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.OPEN_ORDER_LIST, () => {
		it('returns a state with changed listOpened with true', () => {
			const action = {
				type: types.OPEN_ORDER_LIST
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.listOpened = true;

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.CLOSE_ORDER_LIST, () => {
		it('returns a state with changed listOpened with false', () => {
			const action = {
				type: types.CLOSE_ORDER_LIST
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.listOpened = false;

			expect(returnedState).toEqual(expectedState);
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