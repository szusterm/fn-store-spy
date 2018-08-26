import React from 'react';
import {shallow} from 'enzyme';

import {ItemsList} from '../ItemsList/ItemsList';

import ItemCard from '../ItemSearchCard';

const exampleItemsList = [
	{
		_id: '3h5i34uh53i4',
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		type: 'axe',
		imageSrc: 'https://example.com'
	},
	{
		_id: '56b7h8678b',
		name: 'Something',
		price: '800',
		rarity: 'rare',
		type: 'boots',
		imageSrc: 'https://example.pl'
	}
];

const setup = (propOverrides) => {
	const props = Object.assign({
		items: exampleItemsList
	}, propOverrides);

	const wrapper = shallow(<ItemsList {...props}/>);

	return {props, wrapper};
};

describe('ItemsList Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows items of ItemCards from prop', () => {
		const {wrapper, props} = setup({
			items: exampleItemsList
		});

		const items = wrapper.find(ItemCard);

		expect(items.length).toBe(props.items.length);
	});

	it('passes props without id to every ItemSearchCard', () => {
		const {wrapper, props} = setup({
			items: exampleItemsList
		});

		const firstItemProps = {...props.items[0]};
		const secondItemProps = {...props.items[1]};

		delete firstItemProps._id;
		delete secondItemProps._id;

		const firstItemCard = wrapper.find(ItemCard).at(0);
		const secondItemCard = wrapper.find(ItemCard).at(1);

		expect(firstItemCard.props()).toEqual(firstItemProps);
		expect(secondItemCard.props()).toEqual(secondItemProps);
	});
});