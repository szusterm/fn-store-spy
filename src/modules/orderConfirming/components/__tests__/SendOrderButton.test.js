import React from 'react';
import {shallow} from 'enzyme';

import {SendOrderButton} from '../SendOrderButton/SendOrderButton';

const orderedItemsIds = ['45y5tnr5', '56ug657i'];

const orderedItems = [
	{
		_id: orderedItemsIds[0],
		name: 'Something'
	},
	{
		_id: orderedItemsIds[1],
		name: 'Axe'
	}
];

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems, //redux
		maxItemsInOrder: 3, //redux
		sendOrder: () => true, //redux
		closeOrderList: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<SendOrderButton {...props}/>);

	return {props, wrapper};
};

describe('SendOrderButton Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls redux action to send the order with only items ids array after click', () => {
		const {wrapper, props} = setup({
			orderedItems,
			sendOrder: jest.fn()
		});

		wrapper.find('button').simulate('click');

		expect(props.sendOrder).toHaveBeenCalledWith(orderedItemsIds);
	});

	it('makes disabled, during sending the order', () => {
		const {wrapper} = setup({
			sendOrder: jest.fn(() => Promise.resolve(true))
		});

		expect(wrapper.find('button').props().disabled).toBe(false);

		wrapper.find('button').simulate('click');

		expect(wrapper.find('button').props().disabled).toBe(true);
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