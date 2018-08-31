import * as actions from '../actions';
import * as types from '../actionTypes';
import * as api from '../../../api';

jest.mock('../../../api');

describe('Config Actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('setConfig()', () => {
		it('updates config store with api response data', async () => {
			const mockDispatch = jest.fn();
			const expectedChange = {
				type: types.SET_CONFIG,
				payload: 'example config'
			};

			api.fetchConfig.mockReturnValueOnce(Promise.resolve({
				data: expectedChange.payload
			}));

			await actions.setConfig()(mockDispatch);

			expect(mockDispatch).toHaveBeenCalledWith(expectedChange);
		});
	});
});