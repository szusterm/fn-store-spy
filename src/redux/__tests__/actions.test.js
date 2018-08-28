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

	describe('addItemToOrder()', () => {
		it('calls reducer to add an item', () => {
			const expectedChange = {
				type: types.ADD_ITEM_TO_ORDER,
				payload: 'item7'
			};

			const returnedChange = actions.addItemToOrder(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('removeItemFromOrderByIndex()', () => {
		it('calls reducer to add an item', () => {
			const expectedChange = {
				type: types.REMOVE_ITEM_FROM_ORDER_BY_INDEX,
				payload: 3
			};

			const returnedChange = actions.removeItemFromOrderByIndex(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('openOrderList()', () => {
		it('calls reducer open the order list', () => {
			const expectedChange = {
				type: types.OPEN_ORDER_LIST
			};

			const returnedChange = actions.openOrderList(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
		});
	});

	describe('closeOrderList()', () => {
		it('calls reducer close the order list', () => {
			const expectedChange = {
				type: types.CLOSE_ORDER_LIST
			};

			const returnedChange = actions.closeOrderList(expectedChange.payload);

			expect(returnedChange).toEqual(expectedChange);
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