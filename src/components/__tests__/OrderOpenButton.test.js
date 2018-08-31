import React from 'react';
import {shallow} from 'enzyme';

import {OrderOpenButton} from '../OrderOpenButton/OrderOpenButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems: [], //redux
		openOrderList: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<OrderOpenButton {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('hides a button, if order is empty', () => {
		const {wrapper} = setup();

		const hiddenButtonClass = '.order-open-button--closed';

		wrapper.setProps({orderedItems: ['item0']});
		expect(wrapper.find(hiddenButtonClass).exists()).toBe(false);

		wrapper.setProps({orderedItems: []});
		expect(wrapper.find(hiddenButtonClass).exists()).toBe(true);
	});
});