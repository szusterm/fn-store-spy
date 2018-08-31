import React from 'react';
import {shallow} from 'enzyme';

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
});