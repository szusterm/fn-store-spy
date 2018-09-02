import React from 'react';
import {shallow} from 'enzyme';

import {FullOrderCount} from '../FullOrderCount/FullOrderCount';

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems: ['item1'], //redux
		maxItemsInOrder: 3 //redux
	}, propOverrides);

	const wrapper = shallow(<FullOrderCount {...props}/>);

	return {props, wrapper};
};

describe('FullOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows a count of items in the order', () => {
		const {wrapper, props} = setup({
			orderedItems: ['item7', 'item1']
		});

		const showedCount = wrapper.find('.full-order-count--ordered').text();

		expect(showedCount).toBe(props.orderedItems.length);
	});

	it('shows a maximum count of items in the order', () => {
		const {wrapper, props} = setup({
			maxItemsInOrder: 11
		});

		const showedCount = wrapper.find('.full-order-count--maximum').text();

		expect(showedCount).toBe(props.maxItemsInOrder);
	});

	it('changes count styles if the order is too big', () => {
		const {wrapper} = setup({
			maxItemsInOrder: 2
		});

		const countClass = '.full-order-count--ordered';

		const classToAdd = '.ordered--exceeded';

		wrapper.setProps({orderedItems: ['item2']});
		const hasClassWithLower = wrapper.find(countClass).hasClass(classToAdd);
		expect(hasClassWithLower).toBe(true);

		wrapper.setProps({orderedItems: ['item2']});
		const hasClassWithHigher = wrapper.find(countClass).hasClass(classToAdd);
		expect(hasClassWithHigher).toBe(true);
	});
});