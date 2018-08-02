const itemInstance = require('../item');
const ItemModel = require('../item/item.model');
const getResponseObject = require('../../helpers/getResponseObject');
const clientConfig = require('../../config/client');

const getQueryMocks = () => {
	const obj = {
		exec: jest.fn(() => obj),
		find: jest.fn(() => obj),
		where: jest.fn(() => obj),
		equals: jest.fn(() => obj),
		in: jest.fn(() => obj),
		limit: jest.fn(() => obj),
		skip: jest.fn(() => obj)
	};

	return obj;
};

jest.mock('../item/item.model', () => true);
jest.mock('../../helpers/getResponseObject');

describe('Item Factory', () => {
	let item = null;
	beforeEach(() => {
		item = itemInstance;
		item._findingQuery = getQueryMocks();
	});
	afterEach(() => {
		item = null;
	});

	describe('find()', () => {
		it('call find() method of ItemModel', () => {
			item.find();
			expect(ItemModel.find).toHaveBeenCalledTimes(1);
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item.find();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});

	describe('_execQuery()', () => {
		it('exec query to find matching items', async () => {
			await item._execQuery();
			expect(item._findingQuery.exec).toHaveBeenCalledTimes(1);
		});

		it('returns object with occurrence of an error and response data', async () => {
			const returnedText = 'me';
			const returnedError = 'error';

			item._findingQuery.exec
				.mockReturnValueOnce(Promise.resolve(returnedText))
				.mockReturnValueOnce(Promise.reject(returnedError));


			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(false, returnedText);

			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(true, returnedError);
		});
	});

	// describe('_getFilterFunctions()', () => {
	// 	it('returns different functions to filter and exec query', () => {
	// 		const returnedObject = item._getFilterFunctions();
	// 		expect(typeof item._getFilterFunctions()).toBe('object');
	// 	});
	// });

	describe('_filterByIds()', () => {
		it('adds id filter with ids array', () => {
			const ids = ['123', '432'];

			item._filterByIds(ids);

			expect(item._findingQuery.where).toHaveBeenCalledWith('_id');
			expect(item._findingQuery.in).toHaveBeenCalledWith(ids);
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item._filterByIds();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});

	describe('_filterByNameContainingText()', () => {
		it('adds name filter with containing string', () => {
			const name = 'Ann';
			const nameRegExp = new RegExp(`^.*${name}.*$`);

			item._filterByNameContainingText(name);

			expect(item._findingQuery.where).toHaveBeenCalledWith('name');
			expect(item._findingQuery.equals).toHaveBeenCalledWith(nameRegExp);
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item._filterByNameContainingText();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});

	describe('_filterByNames()', () => {
		it('adds name filter with names array', () => {
			const names = ['Ann', 'Toy'];

			item._filterByNames(names);

			expect(item._findingQuery.where).toHaveBeenCalledWith('name');
			expect(item._findingQuery.in).toHaveBeenCalledWith(names);
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item._filterByNames();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});

	describe('_filterByType()', () => {
		it('adds type filter with names array', () => {
			const type = 'axe';

			item._filterByType(type);

			expect(item._findingQuery.where).toHaveBeenCalledWith('type');
			expect(item._findingQuery.equals).toHaveBeenCalledWith(type);
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item._filterByType();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});

	describe('_setPage()', () => {
		it('limits getting items', () => {
			const {maxItemsPerPage} = clientConfig;

			item._setPage();

			expect(item._findingQuery.limit).toHaveBeenCalledWith(maxItemsPerPage);
		});

		it('starts getting items from specific one', () => {
			const {maxItemsPerPage} = clientConfig;
			const pages = [1, 5, 7, 10];

			for (const page of pages) {
				const firstItemOnPage = (maxItemsPerPage * page - maxItemsPerPage);
				item._setPage(page);

				expect(item._findingQuery.skip).toHaveBeenCalledWith(firstItemOnPage);
			}
		});

		it('call _getFilterFunctions() to return filters and exec methods', () => {
			item._getFilterFunctions = jest.fn();
			item._filterByType();
			expect(item._getFilterFunctions).toHaveBeenCalledTimes(1);
		});
	});
});