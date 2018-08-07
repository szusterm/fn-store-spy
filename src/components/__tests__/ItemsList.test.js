import React from 'react';
import {shallow} from 'enzyme';

import ItemsList from '../ItemsList';

const setup = (propOverrides) => {
	const props = Object.assign({
		items: [{}]
	}, propOverrides);

	const wrapper = shallow(<ItemsList {...props}/>);

	return {props, wrapper};
};

describe('ItemsList Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup({
			items: [{}, {}]
		});

		expect(wrapper).toMatchSnapshot();
	});

	it('shows list of ItemCards from prop', () => {
		const {wrapper, props} = setup({
			items: [{}, {}, {}]
		});

		const items = wrapper.find('ItemCard');

		expect(items.length).toBe(props.items.length);
	});

	it('passes props to every ItemCard', () => {
		const {wrapper, props} = setup({
			items: [
				{
					name: 'Super Axe',
					price: '2000',
					rarity: 'uncommon',
					imageSrc: 'https://example.com'
				},
				{
					name: 'Something',
					price: '800',
					rarity: 'rare',
					imageSrc: 'https://example.pl'
				}
			]
		});

		const firstItemCard = wrapper.find('ItemCard').at(0);
		const secondItemCard = wrapper.find('ItemCard').at(1);

		expect(firstItemCard.props()).toEqual(props.items[0]);
		expect(secondItemCard.props()).toEqual(props.items[1]);
	});
});