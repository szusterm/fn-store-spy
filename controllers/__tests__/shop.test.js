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

		it('updates a shop offer', async () => {
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
		it('updates an offer with database data using an items names array', async () => {
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

		it('download items from a database', async () => {
			const itemsNames = ['My axe', 'Super Boots'];

			await shop._updateItemsWithDatabase(itemsNames);

			expect(itemFactory.find).toHaveBeenCalledTimes(1);
			expect(itemFactory.names).toHaveBeenCalledWith(itemsNames);
			expect(itemFactory.exec).toHaveBeenCalledTimes(1);
		});

		it('returns boolean that an error occurred', async () => {
			let response;

			itemFactory.exec.mockReturnValueOnce({err: true, data: {}});
			response = await shop._updateItemsWithDatabase([]);
			expect(response).toBeFalsy();

			itemFactory.exec.mockReturnValueOnce({err: false, data: {}});
			response = await shop._updateItemsWithDatabase([]);
			expect(response).toBeTruthy();

		});
	});

	describe('_getNamesFromObjects()', () => {
		it('returns an array of names which had been got from objects', () => {
			const items = [
				{name: 'Huge Axe'},
				{name: 'Big Outfit'}
			];
			const itemsNames = [
				items[0].name,
				items[1].name
			];

			const response = shop._getNamesFromObjects(items);

			expect(response).toEqual(itemsNames);
		});
	});
});