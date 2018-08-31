import React from 'react';
import {shallow} from 'enzyme';

import BlackCurtain from '../../../../components/BlackCurtain';

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

	it('hides if an order is empty', () => {
		const {wrapper} = setup({
			listOpened: true
		});

		const hiddenOrderClass = '.order-info--hidden';

		wrapper.setProps({items: []});
		expect(wrapper.find(hiddenOrderClass).exists()).toBe(true);

		wrapper.setProps({items: ['item8']});
		expect(wrapper.find(hiddenOrderClass).exists()).toBe(false);
	});

	it('hides if BlackCurtain calls ocClick callback', () => {
		const {wrapper, props} = setup({
			items: ['item3'],
			closeOrderList: jest.fn()
		});

		wrapper.find(BlackCurtain).props().onClick();

		expect(props.closeOrderList).toHaveBeenCalledTimes(1);
	});
});