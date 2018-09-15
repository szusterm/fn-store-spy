const shop = require('../shop');
const itemFactory = require('../../database/factories/item');
const fetchShop = require('../../services/fnbr/fetchShop');

jest.mock('../../database/factories/item');
jest.mock('../../services/fnbr/fetchShop');

describe('Shop Controller', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	describe('update()', () => {
		const exampleFetchShopResponse = {
			err: false,
			data: {
				data: {
					featured: ['item0'],
					daily: ['item65']
				}
			}
		};

		let mockGetMergedFeaturedAndDaily;
		beforeEach(() => {
			mockGetMergedFeaturedAndDaily = jest.spyOn(shop, '_getMergedFeaturedAndDaily');
		});
		afterEach(() => {
			mockGetMergedFeaturedAndDaily.mockRestore();
		});

		it('calls fetchShop() from fnbr api to get the current store offer', async () => {
			fetchShop.mockReturnValueOnce(Promise.resolve(exampleFetchShopResponse));
			mockGetMergedFeaturedAndDaily.mockReturnValueOnce([]);

			await shop.update();

			expect(fetchShop).toHaveBeenCalledTimes(1);
		});

		it('updates _items with returned value of _getMergedFeaturedAndDaily()', async () => {
			const {featured, daily} = exampleFetchShopResponse.data.data;
			const itemsToReturn = [...featured, ...daily];

			shop._items = [];

			fetchShop.mockReturnValueOnce(Promise.resolve(exampleFetchShopResponse));
			mockGetMergedFeaturedAndDaily.mockReturnValueOnce(itemsToReturn);

			await shop.update();

			expect(shop._items).toEqual(itemsToReturn);
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

	describe('GETTERS', () => {
		const items = [
			{
				id: '123',
				name: 'Huge Coo',
				type: 'axe'
			},
			{
				id: '789',
				name: 'Minimal Venom',
				type: 'outfit'
			}
		];

		beforeEach(() => shop._items = items);

		describe('items', () => {
			it('returns an items names array', () => {
				expect(shop.items).toEqual(items);
			});
		});

		describe('ids', () => {
			it('returns an items ids array', () => {
				const itemsIds = [
					items[0].id,
					items[1].id
				];

				expect(shop.ids).toEqual(itemsIds);
			});
		});

		describe('names', () => {
			it('returns an items names array', () => {
				const itemsNames = [
					items[0].name,
					items[1].name
				];

				expect(shop.names).toEqual(itemsNames);
			});
		});
	});
});