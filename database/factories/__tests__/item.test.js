const itemInstance = require('../item');
const ItemModel = require('../../models/item.model');
const getResponseObject = require('../../../helpers/getResponseObject');
const clientConfig = require('../../../config/client');

jest.mock('../../models/item.model');
jest.mock('../../../helpers/getResponseObject');

let item;
let getFilterFunctions;

const returningFilters = {
	description: 'calls _getFilterFunctions() to return filters and exec methods',
	test: (method) => {
		item[method]();
		expect(getFilterFunctions).toHaveBeenCalledTimes(1);
		getFilterFunctions.mockRestore();
	}
};

describe('Item Factory', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		item = itemInstance;
		getFilterFunctions = jest.spyOn(item, '_getFilterFunctions');
	});
	afterEach(() => {
		item = null;
		getFilterFunctions.mockRestore();
	});

	describe('find()', () => {
		it('calls find() method of ItemModel', () => {
			item.find();
			expect(ItemModel.find).toHaveBeenCalledTimes(1);
		});

		it(returningFilters.description, () => returningFilters.test('find'));
	});

	describe('_execQuery()', () => {
		let mockExistsNextPage;
		beforeEach(() => mockExistsNextPage = jest.spyOn(item, '_existsNextPage'));
		afterEach(() => mockExistsNextPage.mockRestore());

		it('execs a query to find matching items', async () => {
			await item._execQuery();
			expect(ItemModel.exec).toHaveBeenCalledTimes(1);
		});

		it('returns an object with occurrence of an error and items and stats or error details', async () => {
			const {maxItemsPerPage} = clientConfig;

			const returnedObject = {
				items: ['items0', 'item1'],
				nextPageAvailable: true,
				maxItemsPerPage
			};
			const returnedError = 'error';

			mockExistsNextPage.mockReturnValueOnce(returnedObject.nextPageAvailable);

			ItemModel.exec
				.mockReturnValueOnce(Promise.resolve(returnedObject.items))
				.mockReturnValueOnce(Promise.reject(returnedError));


			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(false, returnedObject);

			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(true, returnedError);
		});
	});

	describe('_getFilterFunctions()', () => {
		beforeEach(() => getFilterFunctions.mockRestore());

		it('returns different functions to filter and exec query', () => {
			for (const methodName in item._getFilterFunctions()) {
				const gotMethod = item._getFilterFunctions()[methodName];
				expect(typeof gotMethod).toBe('function');
			}
		});
	});

	describe('_filterByIds()', () => {
		it('adds an id filter with an ids array', () => {
			const ids = ['123', '432'];

			item._filterByIds(ids);

			expect(ItemModel.where).toHaveBeenCalledWith('_id');
			expect(ItemModel.in).toHaveBeenCalledWith(ids);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByIds'));
	});

	describe('_filterByNameContainingText()', () => {
		it('adds a name filter with containing string', () => {
			const name = 'Ann';
			const nameRegExp = new RegExp(`^.*${name}.*$`);

			item._filterByNameContainingText(name);

			expect(ItemModel.where).toHaveBeenCalledWith('name');
			expect(ItemModel.equals).toHaveBeenCalledWith(nameRegExp);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByNameContainingText'));
	});

	describe('_filterByNames()', () => {
		it('adds a name filter with a names array', () => {
			const names = ['Ann', 'Toy'];

			item._filterByNames(names);

			expect(ItemModel.where).toHaveBeenCalledWith('name');
			expect(ItemModel.in).toHaveBeenCalledWith(names);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByNames'));
	});

	describe('_filterByType()', () => {
		it('adds a type filter with a names array', () => {
			const type = 'axe';

			item._filterByType(type);

			expect(ItemModel.where).toHaveBeenCalledWith('type');
			expect(ItemModel.equals).toHaveBeenCalledWith(type);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByType'));
	});

	describe('_setPage()', () => {
		it('limits getting items to one more than config value', () => {
			//Adds this to check later, that exists next page
			const {maxItemsPerPage} = clientConfig;

			item._setPage();

			expect(ItemModel.limit).toHaveBeenCalledWith(maxItemsPerPage + 1);
		});

		it('starts getting items from specific one', () => {
			const {maxItemsPerPage} = clientConfig;
			const pages = [1, 5, 7, 10];

			for (const page of pages) {
				const firstItemOnPage = (maxItemsPerPage * page - maxItemsPerPage);
				item._setPage(page);

				expect(ItemModel.skip).toHaveBeenCalledWith(firstItemOnPage);
			}
		});

		it(returningFilters.description, () => returningFilters.test('_setPage'));
	});

	describe('_getItemsWithoutExcess()', () => {
		let mockExistsNextPage;
		beforeEach(() => mockExistsNextPage = jest.spyOn(item, '_existsNextPage'));
		afterEach(() => mockExistsNextPage.mockRestore());

		it('returns items array without excess, if exists', () => {
			const inputItems = ['item1', 'item2', 'item3'];
			const itemsWithoutExcess = ['item1', 'item2'];

			mockExistsNextPage
				.mockReturnValueOnce(true)
				.mockReturnValueOnce(false);

			const returnedItemsWithRemovedExcess = item._getItemsWithoutExcess(inputItems);
			expect(returnedItemsWithRemovedExcess).toEqual(itemsWithoutExcess);

			const returnedUnchangedItems = item._getItemsWithoutExcess(inputItems);
			expect(returnedUnchangedItems).toEqual(inputItems);
		});
	});

	describe('_existsNextPage()', () => {
		it('returns true if number of items is greater than max items per page', () => {
			const {maxItemsPerPage} = clientConfig;

			const existsForGreater = item._existsNextPage(maxItemsPerPage + 1);

			expect(existsForGreater).toBe(true);
		});

		it('returns false if number of items is equal or lower than max items per page', () => {
			const {maxItemsPerPage} = clientConfig;

			const existsForEqual = item._existsNextPage(maxItemsPerPage);
			const existsForLower = item._existsNextPage(maxItemsPerPage - 1);

			expect(existsForEqual).toBe(false);
			expect(existsForLower).toBe(false);
		});
	});
});