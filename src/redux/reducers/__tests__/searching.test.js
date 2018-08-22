import reducer from '../searching';
import * as types from '../../actionTypes';

describe('Searching Reducer', () => {
	describe('default', () => {
		it('replaces whole state', () => {
			const initialState = {
				items: ['item0']
			};

			const action = {
				type: ''
			};

			const returnedChange = reducer(initialState, action);

			expect(returnedChange).toEqual(initialState);
		});
	});
});