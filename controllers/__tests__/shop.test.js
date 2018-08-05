const shop = require('../shop');
const itemFactory = require('../../database/factories/item');

jest.mock('../../database/factories/item');

describe('Shop Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('update()', () => {
		let mockUpdateItemsWithDatabase;
		let mockGetNamesFromObjects;
		beforeEach(() => {
			mockUpdateItemsWithDatabase = jest.spyOn(shop, '_updateItemsWithDatabase');
			mockGetNamesFromObjects = jest.spyOn(shop, '_getNamesFromObjects');
		});
		afterEach(() => {
			mockUpdateItemsWithDatabase.mockRestore();
			mockGetNamesFromObjects.mockRestore();
		});

		it('update shop offer', async () => {
			const exampleItems = [
				{name: 'Some Axe'},
				{name: 'Super Backapck'}
			];
			const itemsNamesArray = [
				exampleItems[0].name,
				exampleItems[1].name
			];

			shop._items = [];
			mockUpdateItemsWithDatabase.mockImplementationOnce(() => {
				shop._items = exampleItems;
				return true;
			});
			mockGetNamesFromObjects.mockReturnValueOnce(itemsNamesArray);

			const response = await shop.update();

			expect(shop._items).toEqual(exampleItems);
			expect(response).toBeTruthy();
			expect(mockUpdateItemsWithDatabase).toHaveBeenCalledWith(itemsNamesArray);
		});
	});

	describe('_updateItemsWithDatabase()', () => {
		it('update offer with database data using items names array', async () => {
			const returnedResponse = {
				err: false,
				data: [
					{id: '123'},
					{id: '666'}
				]
			};

			shop._items = [];

			itemFactory.exec.mockReturnValueOnce(returnedResponse);

			await shop._updateItemsWithDatabase([]);

			expect(shop._items).toEqual(returnedResponse.data);
		});

		it('download items from database', async () => {
			const itemsNames = ['My axe', 'Super Boots'];

			await shop._updateItemsWithDatabase(itemsNames);

			expect(itemFactory.find).toHaveBeenCalledTimes(1);
			expect(itemFactory.names).toHaveBeenCalledWith(itemsNames);
			expect(itemFactory.exec).toHaveBeenCalledTimes(1);
		});
	});
});