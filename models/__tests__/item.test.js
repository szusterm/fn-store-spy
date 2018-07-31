const itemInstance = require('../item');
const ItemModel = require('../item/item.model');
const getResponseObject = require('../../helpers/getResponseObject');

jest.mock('../item/item.model', () => {
	return {
		find: jest.fn().mockReturnValue({
			exec: jest.fn()
		})
	}
});
jest.mock('../../helpers/getResponseObject');

describe('Item Factory', () => {
	let item = null;
	beforeEach(() => {
		item = itemInstance;
	});
	afterEach(() => {
		item = null;
		jest.resetAllMocks();
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
			item._findingQuery = {
				exec: jest.fn()
			};

			await item._execQuery();
			expect(item._findingQuery.exec).toHaveBeenCalledTimes(1);
		});

		it ('returns object with occurrence of an error and response data', async () => {
			const returnedText = 'me';
			const returnedError = 'error';

			item._findingQuery = {
				exec: jest.fn()
					.mockReturnValueOnce(Promise.resolve(returnedText))
					.mockReturnValueOnce(Promise.reject(returnedError))
			};

			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(false, returnedText);

			await item._execQuery();
			expect(getResponseObject).toHaveBeenCalledWith(true, returnedError);
		});
	});
});