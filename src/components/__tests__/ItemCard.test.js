import React from 'react';
import {shallow} from 'enzyme';

import ItemCard from '../ItemCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		name: 'Super Axe',
		price: 2000,
		rarity: 'uncommon',
		imgSrc: 'https://example.com'
	}, propOverrides);

	const wrapper = shallow(<ItemCard {...props}/>);

	return {props, wrapper};
};

describe('ItemCard Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});