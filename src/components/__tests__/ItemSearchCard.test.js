import React from 'react';
import {shallow} from 'enzyme';

import ItemCoin from '../ItemCoin';

import {ItemSearchCard} from '../ItemSearchCard/ItemSearchCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		_id: 'eg8er3478e',
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		type: 'axe',
		imageSrc: 'https://example.com',
		orderedItems: [],
		addItemToOrder: () => true,
		removeItemFromOrderByIndex: () => true
	}, propOverrides);

	const wrapper = shallow(<ItemSearchCard {...props}/>);

	return {props, wrapper};
};

describe('ItemSearchCard Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows a name from prop', () => {
		const {wrapper, props} = setup({
			name: 'Normal Weapon'
		});

		const displayedName = wrapper.find('.bot-part--name').text();

		expect(displayedName).toBe(props.name);
	});

	it('shows a price from prop', () => {
		const {wrapper, props} = setup({
			price: '2000'
		});

		const displayedPrice = wrapper.find('.description--price').text();

		expect(displayedPrice).toBe(props.price);
	});

	it('shows a type from prop', () => {
		const {wrapper, props} = setup({
			type: 'axe'
		});

		const displayedType = wrapper.find('.description--type').text();

		expect(displayedType).toBe(props.type);
	});

	it('puts rarity prop to ItemCoin', () => {
		const {wrapper, props} = setup({
			rarity: 'uncommon'
		});

		const rarityInItemCoin = wrapper.find(ItemCoin).props().rarity;

		expect(rarityInItemCoin).toBe(props.rarity);
	});

	it('puts imageSrc to ItemCoin', () => {
		const {wrapper, props} = setup({
			imageSrc: 'https://example.com'
		});

		const imageSrcInItemCoin = wrapper.find(ItemCoin).props().imageSrc;

		expect(imageSrcInItemCoin).toBe(props.imageSrc);
	});
});