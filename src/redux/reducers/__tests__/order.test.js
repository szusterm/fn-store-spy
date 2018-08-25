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

			const expectedState = {...initialState};
			expectedState.items.push(action.payload);

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.SET_ORDERED_ITEM_ACTIVE, () => {
		const initialStateForActive = {
			items: [
				{active: false},
				{active: false}
			]
		};

		it('returns a state with changed an active prop in an item', () => {
			const action = {
				type: types.SET_ORDERED_ITEM_ACTIVE,
				payload: {
					index: 1,
					active: true
				}
			};
			const {index, active} = action.payload;

			const expectedState = {...initialStateForActive};
			expectedState.items[index].active = active;

			const returnedState = reducer(initialStateForActive, action);

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