import React from 'react';
import {shallow} from 'enzyme';

import ItemCard from '../ItemCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		imageSrc: 'https://example.com'
	}, propOverrides);

	const wrapper = shallow(<ItemCard {...props}/>);

	return {props, wrapper};
};

describe('ItemCard Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows name from prop', () => {
		const {wrapper, props} = setup({
			name: 'Normal Weapon'
		});

		const displayedName = wrapper.find('.description--name').text();

		expect(displayedName).toBe(props.name);
	});

	it('shows price from prop', () => {
		const {wrapper, props} = setup({
			price: '2000'
		});

		const displayedName = wrapper.find('.description--price').text();

		expect(displayedName).toBe(props.price);
	});

	it('adds class with background rarity color', () => {
		const {wrapper, props} = setup({
			rarity: 'uncommon'
		});

		const rarityColorClass = `.item-card--${props.rarity}`;
		const displayedName = wrapper.find(rarityColorClass);

		expect(displayedName.exists()).toBe(true);
	});

	it('shows item image from prop', () => {
		const {wrapper, props} = setup({
			imageSrc: 'https://example.com'
		});

		const displayedImgSrc = wrapper.find('.img-box--image').props().src;

		expect(displayedImgSrc).toBe(props.imageSrc);
	});
});