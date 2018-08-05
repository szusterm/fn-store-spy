const shop = {
	update: jest.fn()
};

Object.defineProperty(shop, 'items', {get: () => true});
Object.defineProperty(shop, 'ids', {get: () => true});
Object.defineProperty(shop, 'names', {get: () => true});

module.exports = shop;