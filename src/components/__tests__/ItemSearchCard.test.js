import React from 'react';
import {shallow} from 'enzyme';

import {ItemSearchCard} from '../ItemSearchCard/ItemSearchCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		type: 'axe',
		imageSrc: 'https://example.com'
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

	it('adds class with background rarity color', () => {
		const {wrapper, props} = setup({
			rarity: 'uncommon'
		});

		const rarityColorClass = `.top-part--img-box--${props.rarity}`;
		const displayedItem = wrapper.find(rarityColorClass);

		expect(displayedItem.exists()).toBe(true);
	});

	it('shows an item image from prop', () => {
		const {wrapper, props} = setup({
			imageSrc: 'https://example.com'
		});

		const displayedImgSrc = wrapper.find('.img-box--image').props().src;

		expect(displayedImgSrc).toBe(props.imageSrc);
	});
});