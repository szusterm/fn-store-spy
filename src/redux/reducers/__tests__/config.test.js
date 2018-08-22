import reducer from '../config';
import * as types from '../../actionTypes';

describe('Config Reducer', () => {
	describe(types.SET_CONFIG, () => {
		it('replaces whole config state', () => {
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
		it('replaces whole state', () => {
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