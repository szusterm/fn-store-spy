import React from 'react';
import {shallow} from 'enzyme';

import {Searching} from '../Searching/Searching';

const setup = (propOverrides) => {
	const props = Object.assign({
		updateItems: () => true, //redux
		setPageFilter: () => true, //redux
		items: [] //redux
	}, propOverrides);

	const wrapper = shallow(<Searching {...props}/>);

	return {props, wrapper};
};

describe('Pagination Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('puts items from store to ItemsList as prop', () => {
		const {wrapper, props} = setup({
			items: ['items0', 'item1']
		});

		const itemsInItemsList = wrapper.find('ItemsList').props().items;

		expect(itemsInItemsList).toEqual(props.items);
	});
});