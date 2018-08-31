import React from 'react';
import {shallow} from 'enzyme';

import ItemOrderCard from '../ItemOrderCard';

import {OrderList} from '../OrderList/OrderList';

const generateExampleItems = (length) => {
	let exampleItems = [];
	for (let index = 0; index < length; index++) {
		exampleItems.push({
			_id: `item${index}`,
			imageSrc: 'https://example.com',
			rarity: 'legendary'
		});
	}

	return exampleItems;
};

const setup = (propOverrides) => {
	const props = Object.assign({
		items: generateExampleItems(2)
	}, propOverrides);

	const wrapper = shallow(<OrderList {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows an ordered items list from a redux state', () => {
		const {wrapper, props} = setup({
			items: generateExampleItems(11)
		});

		const orderedItemsLength = wrapper.find(ItemOrderCard).length;

		expect(orderedItemsLength).toBe(props.items.length);
	});
});