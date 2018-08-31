import React from 'react';
import {shallow} from 'enzyme';

import {ItemCoin} from '../ItemCoin/ItemCoin';

const setup = (propOverrides) => {
	const props = Object.assign({
		imageSrc: 'https://example.com',
		rarity: 'uncommon'
	}, propOverrides);

	const wrapper = shallow(<ItemCoin {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('adds class with background rarity color', () => {
		const {wrapper, props} = setup({
			rarity: 'uncommon'
		});

		const rarityColorClass = `.item-coin--${props.rarity}`;
		const displayedItem = wrapper.find(rarityColorClass);

		expect(displayedItem.exists()).toBe(true);
	});

	it('shows an item image from prop', () => {
		const {wrapper, props} = setup({
			imageSrc: 'https://example.com'
		});

		const displayedImgSrc = wrapper.find('.item-coin--image').props().src;

		expect(displayedImgSrc).toBe(props.imageSrc);
	});
});