import * as actions from '../actions';
import * as types from '../actionTypes';
import api from '../../../api';

jest.mock('../../../api');

describe('Items Searching Actions', () => {
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
			err: false,
			data: {
				items: exampleItems,
				nextPageAvailable: exampleNextPageAvailable
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
				err: true
			};

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponseWithError));
			const firstResponse = await actions.updateItems()(mockDispatch, mockGetState);
			expect(firstResponse).toBe(!apiResponseWithError.err);

			api.fetchItems.mockReturnValueOnce(Promise.resolve(apiResponse));
			const secondResponse = await actions.updateItems()(mockDispatch, mockGetState);
			expect(secondResponse).toBe(!apiResponse.err);
		});
	});

	describe('setPageFilter()', () => {
		it('calls reducer to change a page filter', () => {
			const expectedChange = {
				type: types.SET_PAGE,
				payload: 6
			};

			const returnedChange = actions.setPageFilter(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('setNameFilter()', () => {
		it('calls reducer to change a name filter', () => {
			const expectedChange = {
				type: types.SET_NAME,
				payload: 6
			};

			const returnedChange = actions.setNameFilter(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});
});