import React from 'react';
import {shallow} from 'enzyme';

import {Searching} from '../Searching/Searching';

import Pagination from '../Pagination/Pagination';

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

	it('updates items in store if pagination changes', () => {
		const {wrapper, props} = setup({
			updateItems: jest.fn()
		});

		wrapper.find(Pagination).props().onChange();

		expect(props.updateItems).toHaveBeenCalledTimes(2); //2, because first call is in componentDidMount()
	});
});