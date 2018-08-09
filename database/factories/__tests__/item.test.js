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
		it('execs a query to find matching items', async () => {
			await item._execQuery();
			expect(ItemModel.exec).toHaveBeenCalledTimes(1);
		});

		it('returns an object with occurrence of an error and response data', async () => {
			const returnedText = 'me';
			const returnedError = 'error';

			ItemModel.exec
				.mockReturnValueOnce(Promise.resolve(returnedText))
				.mockReturnValueOnce(Promise.reject(returnedError));


			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(false, returnedText);

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
		it('limits getting items', () => {
			const {maxItemsPerPage} = clientConfig;

			item._setPage();

			expect(ItemModel.limit).toHaveBeenCalledWith(maxItemsPerPage);
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

	describe('getStats()', () => {
		const count = 2137;
		const pages = 29;

		let mockGetCount;
		let mockGetMaxPage;
		beforeEach(() => {
			mockGetCount = jest.spyOn(item, '_getCount');
			mockGetMaxPage = jest.spyOn(item, '_getMaxPage');
		});
		afterEach(() => {
			mockGetCount.mockRestore();
			mockGetMaxPage.mockRestore();
		});

		it('returns object with items count', () => {
			mockGetCount.mockReturnValueOnce(count);
			const response = item.getStats();
			expect(response.count).toBe(count);
		});

		it('returns object with maximum page', () => {
			mockGetMaxPage.mockReturnValueOnce(pages);
			const response = item.getStats();
			expect(response.pages).toBe(pages);
		});
	});

	describe('_getCount()', () => {
		it('returns count of items in database', () => {
			const items = 129;

			ItemModel.estimatedDocumentCount.mockReturnValueOnce(items);

			const returnedCount = item._getCount();

			expect(returnedCount).toBe(items);
		});
	});

	describe('_getMaxPage()', () => {
		let mockGetCount;
		beforeEach(() => mockGetCount = jest.spyOn(item, '_getCount'));
		afterEach(() => mockGetCount.mockRestore());

		it('returns maximum page number', () => {
			const {maxItemsPerPage} = clientConfig;
			const maxPage = 100;
			const itemsCount = maxItemsPerPage*(maxPage - 1) + 1;

			mockGetCount.mockReturnValueOnce(itemsCount);
			const returnedMaxPage = item._getMaxPage();
			expect(returnedMaxPage).toBe(maxPage);
		});
	});
});