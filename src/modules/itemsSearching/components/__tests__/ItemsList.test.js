import React from 'react';
import {shallow} from 'enzyme';

import {ItemsList} from '../ItemsList/ItemsList';

import ItemCard from '../ItemSearchCard';

const exampleItemsList = [
	{
		_id: '3h5i34uh53i4',
		fnbrId: '6u69uj6kuj',
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		type: 'axe',
		imageSrc: 'https://example.com'
	},
	{
		_id: '56b7h8678b',
		fnbrId: '4395ytj4f905',
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

	it('passes _id as a key prop to every ItemSearchCard', () => {
		const {wrapper, props} = setup({
			items: exampleItemsList
		});

		for (const [index, itemProps] of props.items.entries()) {
			const itemCardIns = wrapper.find(ItemCard).at(index);
			expect(itemCardIns.key()).toEqual(itemProps._id);
		}
	});

	it('passes props to every ItemSearchCard', () => {
		const {wrapper, props} = setup({
			items: exampleItemsList
		});

		for (const [index, itemProps] of props.items.entries()) {
			delete itemProps._id;

			const itemCardIns = wrapper.find(ItemCard).at(index);
			expect(itemCardIns.props()).toEqual({...itemProps});
		}
	});
});