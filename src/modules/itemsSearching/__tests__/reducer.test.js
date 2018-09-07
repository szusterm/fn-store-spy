import reducer from '../reducer';
import * as types from '../actionTypes';

describe('Items Searching Reducer', () => {
	const initialState = {
		items: [],
		filters: {
			page: 1,
			name: ''
		},
		nextPageAvailable: false
	};

	describe(types.REPLACE_ITEMS, () => {
		it('replaces all items in a state', () => {
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

	describe(types.SET_PAGE, () => {
		it('changes a page filter in a state', () => {
			const action = {
				type: types.SET_PAGE,
				payload: 7
			};

			const expectedState = {...initialState};
			expectedState.filters.page = action.payload;

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.SET_NAME, () => {
		it('changes a name filter in a state', () => {
			const action = {
				type: types.SET_NAME,
				payload: 'me'
			};

			const expectedState = {...initialState};
			expectedState.filters.name = action.payload;

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.SET_NEXT_PAGE_AVAILABILITY, () => {
		it('changes a prop, that next page is available in a state', () => {
			const action = {
				type: types.SET_NEXT_PAGE_AVAILABILITY,
				payload: false
			};

			const expectedState = {...initialState};
			expectedState.nextPageAvailable = action.payload;

			const returnedState = reducer(initialState, action);

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