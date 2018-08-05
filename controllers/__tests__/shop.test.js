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

	describe('_updateItemsWithDatabase', () => {

	});
});