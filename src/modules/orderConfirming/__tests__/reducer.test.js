import reducer from '../reducer';
import * as types from '../actionTypes';

describe('Order Confirming Reducer', () => {
	const initialState = {
		endingScreenOpened: false,
		code: ''
	};

	describe(types.SHOW_ORDER_CONFIRMATION, () => {
		it('returns a state with changed endingScreenOpened with true', () => {
			const action = {
				type: types.SHOW_ORDER_CONFIRMATION
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.endingScreenOpened = true;

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.HIDE_ORDER_CONFIRMATION, () => {
		it('returns a state with changed endingScreenOpened with false', () => {
			const action = {
				type: types.HIDE_ORDER_CONFIRMATION
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.endingScreenOpened = false;

			expect(returnedState).toEqual(expectedState);
		});
	});

	describe(types.SET_CODE, () => {
		it('returns a state with changed the order code', () => {
			const action = {
				type: types.SET_CODE,
				payload: '5h6y596'
			};

			const returnedState = reducer(initialState, action);

			const expectedState = {...initialState};
			expectedState.code = action.payload;

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