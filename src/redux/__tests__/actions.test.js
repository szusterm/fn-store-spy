import * as actions from '../actions';
import * as types from '../actionTypes';
import * as api from '../../api';

jest.mock('../../api');

describe('Actions', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('updateItems()', () => {
		const exampleItems = ['item0', 'item1'];
		const exampleNextPageAvailable = true;
		const exampleFilters = {
			page: 3,
			name: 'Hi man'
		};
		const apiResponse = {
			data: {
				err: false,
				data: {
					items: exampleItems,
					nextPageAvailable: exampleNextPageAvailable
				}
			}
		};

		const mockDispatch = jest.fn();
		const mockGetState = jest.fn().mockReturnValue({
			searching: {
				filters: exampleFilters
			}
		});

		it('replaces items in store with an api response data, if it is no error', async () => {
			const expectedChange = {
				type: types.REPLACE_ITEMS,
				payload: exampleItems
			};

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponse));

			await actions.updateItems()(mockDispatch, mockGetState);

			expect(mockDispatch).toHaveBeenCalledWith(expectedChange);
		});

		it('updates nextPageAvailable wit an api response data, if it is no error', async () => {
			const expectedChange = {
				type: types.SET_NEXT_PAGE_AVAILABILITY,
				payload: exampleNextPageAvailable
			};

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponse));

			await actions.updateItems()(mockDispatch, mockGetState);

			expect(mockDispatch).toHaveBeenCalledWith(expectedChange);
		});

		it('passes a store filters to an api function', async () => {
			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponse));

			await actions.updateItems()(mockDispatch, mockGetState);

			expect(api.fetchItems).toHaveBeenCalledWith(exampleFilters);
		});

		it('returns bool, that everything is done', async () => {
			const apiResponseWithError = {
				data: {
					err: true
				}
			};

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponseWithError));
			const firstResponse = await actions.updateItems()(mockDispatch, mockGetState);
			expect(firstResponse).toBe(!apiResponseWithError.data.err);

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponse));
			const secondResponse = await actions.updateItems()(mockDispatch, mockGetState);
			expect(secondResponse).toBe(!apiResponse.data.err);
		});
	});

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

	describe('setNameFilter()', () => {
		it('calls reducer to change a name filter', () => {
			const expectedChange = {
				type: types.SET_NAME,
				payload: 6
			};

			const returnedChange = actions.setNameFilter(expectedChange.payload);

			expect(expectedChange).toEqual(returnedChange);
		});
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