import * as actions from '../actions';
import * as types from '../actionTypes';
import * as api from '../../api';

jest.mock('../../api');

describe('Actions', () => {
	describe('setPageFilter()', () => {
		it('calls reducer to change a page filter', () => {
			const expectedChange = {
				type: types.SET_PAGE,
				payload: 6
			};

			const returnedChange = actions.setPageFilter(expectedChange.payload);

			expect(expectedChange).toEqual(returnedChange);
		});
	});
});