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

	describe('default', () => {
		it('replaces whole state', () => {
			const action = {
				type: ''
			};

			const returnedChange = reducer(initialState, action);

			expect(returnedChange).toEqual(initialState);
		});
	});
});