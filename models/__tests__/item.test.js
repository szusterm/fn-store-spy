const itemInstance = require('../item');
const ItemModel = require('../item/item.model');
const getResponseObject = require('../../helpers/getResponseObject');
const clientConfig = require('../../config/client');

jest.mock('../item/item.model', () => {
	return {
		find: jest.fn()
	};
});
jest.mock('../../helpers/getResponseObject');

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

let item;
let getFilterFunctions;

const returningFilters = {
	description: 'call _getFilterFunctions() to return filters and exec methods',
	test: (method) => {
		item[method]();
		expect(getFilterFunctions).toHaveBeenCalledTimes(1);
		getFilterFunctions.mockRestore();
	}
};

describe('Item Factory', () => {
	beforeEach(() => {
		item = itemInstance;
		item._findingQuery = getQueryMocks();
		getFilterFunctions = jest.spyOn(item, '_getFilterFunctions');
	});
	afterEach(() => {
		jest.resetAllMocks();
		item = null;
		getFilterFunctions.mockRestore();
	});

	describe('find()', () => {
		it('call find() method of ItemModel', () => {
			item.find();
			expect(ItemModel.find).toHaveBeenCalledTimes(1);
		});

		it(returningFilters.description, () => returningFilters.test('find'));
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

		it(returningFilters.description, () => returningFilters.test('_filterByIds'));
	});

	describe('_filterByNameContainingText()', () => {
		it('adds name filter with containing string', () => {
			const name = 'Ann';
			const nameRegExp = new RegExp(`^.*${name}.*$`);

			item._filterByNameContainingText(name);

			expect(item._findingQuery.where).toHaveBeenCalledWith('name');
			expect(item._findingQuery.equals).toHaveBeenCalledWith(nameRegExp);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByNameContainingText'));
	});

	describe('_filterByNames()', () => {
		it('adds name filter with names array', () => {
			const names = ['Ann', 'Toy'];

			item._filterByNames(names);

			expect(item._findingQuery.where).toHaveBeenCalledWith('name');
			expect(item._findingQuery.in).toHaveBeenCalledWith(names);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByNames'));
	});

	describe('_filterByType()', () => {
		it('adds type filter with names array', () => {
			const type = 'axe';

			item._filterByType(type);

			expect(item._findingQuery.where).toHaveBeenCalledWith('type');
			expect(item._findingQuery.equals).toHaveBeenCalledWith(type);
		});

		it(returningFilters.description, () => returningFilters.test('_filterByType'));
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

		it(returningFilters.description, () => returningFilters.test('_setPage'));
	});
});