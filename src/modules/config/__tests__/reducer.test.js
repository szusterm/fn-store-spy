import reducer from '../reducer';
import * as types from '../../../redux/actionTypes';

describe('Config Reducer', () => {
	describe(types.SET_CONFIG, () => {
		it('replaces a whole config state', () => {
			const initialState = {
				some: true
			};

			const action = {
				type: types.SET_CONFIG,
				payload: {
					some: false,
					one: 11
				}
			};

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(action.payload);
		});
	});

	describe('default', () => {
		it('replaces a whole state', () => {
			const initialState = {
				some: true
			};

			const action = {
				type: ''
			};

			const returnedState = reducer(initialState, action);

			expect(returnedState).toEqual(initialState);
		});
	});
});