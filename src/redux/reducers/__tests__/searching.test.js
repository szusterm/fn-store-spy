import reducer from '../searching';
import * as types from '../../actionTypes';

describe('Searching Reducer', () => {
	const initialState = {
		items: [],
		filters: {
			page: 1,
			name: ''
		},
		nextPageAvailable: false
	};

	describe(types.REPLACE_ITEMS, () => {
		it('replaces all items in state', () => {
			const action = {
				type: types.REPLACE_ITEMS,
				payload: ['item0', 'item2']
			};

			const expectedState = {...initialState};
			expectedState.items = action.payload;

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe('default', () => {
		it('replaces whole state', () => {
			const action = {
				type: ''
			};

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(initialState);
		});
	});
});