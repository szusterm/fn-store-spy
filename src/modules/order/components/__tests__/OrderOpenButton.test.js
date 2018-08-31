import React from 'react';
import {shallow} from 'enzyme';

import CircleOrderCount from '../CircleOrderCount/index';

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

		const hiddenButtonClass = '.order-open-button--hidden';

		wrapper.setProps({orderedItems: ['item0']});
		expect(wrapper.find(hiddenButtonClass).exists()).toBe(false);

		wrapper.setProps({orderedItems: []});
		expect(wrapper.find(hiddenButtonClass).exists()).toBe(true);
	});

	it('calls redux action to open Order after click', () => {
		const {wrapper, props} = setup({
			openOrderList: jest.fn()
		});

		wrapper.simulate('click');

		expect(props.openOrderList).toHaveBeenCalledTimes(1);
	});

	it('shows CircleOrderCount', () => {
		const {wrapper} = setup();

		expect(wrapper.find(CircleOrderCount).exists()).toBe(true);
	});
});