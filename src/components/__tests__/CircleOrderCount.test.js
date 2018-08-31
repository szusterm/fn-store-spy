import React from 'react';
import {shallow} from 'enzyme';

import {CircleOrderCount} from '../CircleOrderCount/CircleOrderCount';

const setup = (propOverrides) => {
	const props = Object.assign({
		items: []
	}, propOverrides);

	const wrapper = shallow(<CircleOrderCount {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('shows a count of items in order', () => {
		const {wrapper, props} = setup({
			items: ['item0', 'item4', 'item2']
		});

		const showedText = wrapper.find('.circle-order-count--number').text();
		const itemsCountAsString = String(props.items.length);

		expect(showedText).toBe(itemsCountAsString);
	});

	it('if order length is higher than 9, shows "9+"', () => {
		let itemsInOrder = [];
		for (let index = 0; index < 10; index++) {
			itemsInOrder.push(`item${index}`);
		}

		const {wrapper} = setup({
			items: itemsInOrder
		});

		const showedText = wrapper.find('.circle-order-count--number').text();
		const expectedText = '9+';

		expect(showedText).toBe(expectedText);
	});
});