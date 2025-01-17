const itemInstance = require('../item');

const ItemModel = require('../../models/item.model');
const getResponseObject = require('../../../helpers/getResponseObject');
const config = require('../../../config');

jest.mock('../../models/item.model');
jest.mock('../../../helpers/getResponseObject');
jest.mock('../../../config', () => ({
	searching: {
		maxItemsPerPage: 12,
		minNameFilterLength: 3,
		maxNameFilterLength: 5
	}
}));

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
		let mockGetItemsWithoutExcess;
		beforeEach(() => {
			mockExistsNextPage = jest.spyOn(item, '_existsNextPage');
			mockGetItemsWithoutExcess = jest.spyOn(item, '_getItemsWithoutExcess');
		});
		afterEach(() => {
			mockExistsNextPage.mockRestore();
			mockGetItemsWithoutExcess.mockRestore();
		});

		it('execs a query to find matching items', async () => {
			await item._execQuery();
			expect(ItemModel.exec).toHaveBeenCalledTimes(1);
		});

		it('returns occurrence of an error and if exists, returns error details', async () => {
			const returnedError = 'error';

			ItemModel.exec
				.mockReturnValueOnce(Promise.reject(returnedError));

			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(true, returnedError);
		});

		it('if error does not exist, returns items and stats', async () => {
			const returnedObject = {
				items: ['items0', 'item1'],
				nextPageAvailable: true
			};

			mockExistsNextPage.mockReturnValueOnce(returnedObject.nextPageAvailable);
			mockGetItemsWithoutExcess.mockReturnValueOnce(returnedObject.items);

			ItemModel.exec
				.mockReturnValueOnce(Promise.resolve(returnedObject.items));


			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(false, returnedObject);
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

	describe('_filterByFnbrIds()', () => {
		it('adds an fnbrId filter with an fnbr ids array', () => {
			const ids = ['123', '432'];

			item._filterByFnbrIds(ids);

			expect(ItemModel.where).toHaveBeenCalledWith('fnbrId');
			expect(ItemModel.in).toHaveBeenCalledWith(ids);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByFnbrIds'));
	});

	describe('_filterByNameContainingText()', () => {
		let mockGetNameRegExp;
		beforeEach(() => mockGetNameRegExp = jest.spyOn(item, '_getNameRegExp'));
		afterEach(() => mockGetNameRegExp.mockRestore());

		it('adds a name filter with containing string', () => {
			const name = 'Ann';
			const nameRegExp = 'example name regular expression';

			mockGetNameRegExp.mockReturnValueOnce(nameRegExp);

			item._filterByNameContainingText(name);

			expect(ItemModel.where).toHaveBeenCalledWith('name');
			expect(ItemModel.equals).toHaveBeenCalledWith(nameRegExp);
		});

		it('adds not a name filter if length is too short or too long', () => {
			const tooShortName = '2n';
			const normalName = '4cha';
			const tooLongName = '6chars';

			item._filterByNameContainingText(tooShortName);
			item._filterByNameContainingText(normalName);
			item._filterByNameContainingText(tooLongName);

			expect(ItemModel.where).toHaveBeenCalledTimes(1);
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
			const {maxItemsPerPage} = config.searching;

			item._setPage();

			expect(ItemModel.limit).toHaveBeenCalledWith(maxItemsPerPage + 1);
		});

		it('starts getting items from specific one', () => {
			const {maxItemsPerPage} = config.searching;
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
			const {maxItemsPerPage} = config.searching;

			const existsForGreater = item._existsNextPage(maxItemsPerPage + 1);

			expect(existsForGreater).toBe(true);
		});

		it('returns false if number of items is equal or lower than max items per page', () => {
			const {maxItemsPerPage} = config.searching;

			const existsForEqual = item._existsNextPage(maxItemsPerPage);
			const existsForLower = item._existsNextPage(maxItemsPerPage - 1);

			expect(existsForEqual).toBe(false);
			expect(existsForLower).toBe(false);
		});
	});

	describe('_getNameRegExp()', () => {
		it('returns regular expression to find name containing string', () => {
			const name = 'Super Cans';

			const inputs = [
				{text: 'er Can', contains: true},
				{text: 'UPER C', contains: true},
				{text: 'suPe', contains: true},
				{text: 'super cans', contains: true},
				{text: 'Super    Cans', contains: false}
			];

			for (const input of inputs) {
				const {text, contains} = input;

				const regExp = item._getNameRegExp(text);

				expect(regExp.test(name)).toBe(contains);
			}
		});
	});
});