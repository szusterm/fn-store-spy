import React from 'react';
import {shallow} from 'enzyme';

import BlackCurtain from '../../../../components/BlackCurtain';
import HideOrderButton from '../HideOrderButton';
import OrderList from '../OrderList';
import FullOrderCount from '../FullOrderCount';
import ConfirmOrderButton from '../ConfirmOrderButton';


import {OrderInfo} from '../OrderInfo/OrderInfo';

const setup = (propOverrides) => {
	const props = Object.assign({
		items: ['item2'], //redux
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

	it('puts listOpened from a redux state as a prop to BlackCurtain', () => {
		const {wrapper, props} = setup({
			listOpened: false
		});

		const showProp = wrapper.find(BlackCurtain).props().show;

		expect(showProp).toBe(props.listOpened);
	});

	it('renders HideOrderButton', () => {
		const {wrapper} = setup();

		expect(wrapper.find(HideOrderButton).exists()).toBe(true);
	});

	it('renders OrderList', () => {
		const {wrapper} = setup();

		expect(wrapper.find(OrderList).exists()).toBe(true);
	});

	it('renders FullOrderCount', () => {
		const {wrapper} = setup();

		expect(wrapper.find(FullOrderCount).exists()).toBe(true);
	});

	it('renders ConfirmOrderButton', () => {
		const {wrapper} = setup();

		expect(wrapper.find(ConfirmOrderButton).exists()).toBe(true);
	});
});