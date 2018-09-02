import React from 'react';
import {shallow} from 'enzyme';

import {ConfirmOrderButton} from '../ConfirmOrderButton/ConfirmOrderButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems: ['item1'], //redux
		maxItemsInOrder: 3 //redux
	}, propOverrides);

	const wrapper = shallow(<ConfirmOrderButton {...props}/>);

	return {props, wrapper};
};

describe('ConfirmOrderButton Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('makes disabled if the order is empty', () => {
		const {wrapper} = setup();

		wrapper.setProps({orderedItems: ['item5']});
		const disabledIfNotEmpty = wrapper.find('button').props().disabled;
		expect(disabledIfNotEmpty).toBe(false);

		wrapper.setProps({orderedItems: []});
		const disabledIfEmpty = wrapper.find('button').props().disabled;
		expect(disabledIfEmpty).toBe(true);
	});

	it('makes disabled, if a number of ordered items is higher than max', () => {
		const {wrapper} = setup({
			maxItemsInOrder: 2
		});

		wrapper.setProps({orderedItems: ['item5']});
		const disabledIfNotHigher = wrapper.find('button').props().disabled;
		expect(disabledIfNotHigher).toBe(false);

		wrapper.setProps({orderedItems: ['item1', 'item2', 'item3']});
		const disabledIfHigher = wrapper.find('button').props().disabled;
		expect(disabledIfHigher).toBe(true);
	});
});