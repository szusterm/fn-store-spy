import React from 'react';
import {shallow} from 'enzyme';

import {OrderInfo} from '../OrderInfo/OrderInfo';

const setup = (propOverrides) => {
	const props = Object.assign({
		items: [], //redux
		listOpened: true, //redux
		closeOrderList: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<OrderInfo {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('hides if listOpened in a redux state is false', () => {
		const {wrapper} = setup({
			items: ['item0']
		});

		const hiddenOrderClass = '.order-info--hidden';

		wrapper.setProps({listOpened: false});
		expect(wrapper.find(hiddenOrderClass).exists()).toBe(true);

		wrapper.setProps({listOpened: true});
		expect(wrapper.find(hiddenOrderClass).exists()).toBe(false);
	});
});