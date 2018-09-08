import React from 'react';
import {shallow} from 'enzyme';

import ItemCoin from '../../../../components/ItemCoin';

import {ItemSearchCard} from '../ItemSearchCard/ItemSearchCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		_id: 'eg8er3478e',
		name: 'Super Axe',
		price: '2000',
		rarity: 'uncommon',
		type: 'axe',
		imageSrc: 'https://example.com',
		orderedItems: [], //redux
		addItemToOrder: () => true, //redux
		removeItemFromOrderByIndex: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<ItemSearchCard {...props}/>);

	return {props, wrapper};
};

describe('ItemSearchCard Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows a name from prop', () => {
		const {wrapper, props} = setup({
			name: 'Normal Weapon'
		});

		const displayedName = wrapper.find('.bot-part--name').text();

		expect(displayedName).toBe(props.name);
	});

	it('shows a price from prop', () => {
		const {wrapper, props} = setup({
			price: '2000'
		});

		const displayedPrice = wrapper.find('.description--price').text();

		expect(displayedPrice).toBe(props.price);
	});

	it('shows a type from prop', () => {
		const {wrapper, props} = setup({
			type: 'axe'
		});

		const displayedType = wrapper.find('.description--type').text();

		expect(displayedType).toBe(props.type);
	});

	it('puts rarity prop to ItemCoin', () => {
		const {wrapper, props} = setup({
			rarity: 'uncommon'
		});

		const rarityInItemCoin = wrapper.find(ItemCoin).props().rarity;

		expect(rarityInItemCoin).toBe(props.rarity);
	});

	it('puts imageSrc to ItemCoin', () => {
		const {wrapper, props} = setup({
			imageSrc: 'https://example.com'
		});

		const imageSrcInItemCoin = wrapper.find(ItemCoin).props().imageSrc;

		expect(imageSrcInItemCoin).toBe(props.imageSrc);
	});

	it('after click the component, adds the item to an order, if it is not ordered', () => {
		const {wrapper, props} = setup({
			_id: 'abc45g',
			addItemToOrder: jest.fn(),
			orderedItems: []
		});

		wrapper.find('button').simulate('click');

		expect(props.addItemToOrder).toHaveBeenCalledTimes(1);
	});

	it('after click the component, removes the item from an order, if it is ordered', () => {
		const {wrapper, props} = setup({
			_id: 'superid',
			removeItemFromOrderByIndex: jest.fn(),
			orderedItems: [
				{_id: 'xddd'},
				{_id: 'superid'}
			]
		});

		wrapper.find('button').simulate('click');

		expect(props.removeItemFromOrderByIndex).toHaveBeenCalledWith(1);
	});

	it('shows confirmation, if the item is ordered', () => {
		const {wrapper, props} = setup({
			_id: 'superid',
			orderedItems: []
		});

		const confirmationClass = '.visual-box--action-box--active';
		const iconElement = '.action-box--sign span';
		const confirmationIcon = 'done';


		const confirmationWithoutOrder = wrapper.find(confirmationClass);
		const iconWithoutOrder = wrapper.find(iconElement).text();

		expect(confirmationWithoutOrder.exists()).toEqual(false);
		expect(iconWithoutOrder).not.toBe(confirmationIcon);

		wrapper.setProps({
			orderedItems: [{_id: props._id}]
		});

		const confirmationWithOrder = wrapper.find(confirmationClass);
		const iconWithOrder = wrapper.find(iconElement).text();

		expect(confirmationWithOrder.exists()).toEqual(true);
		expect(iconWithOrder).toBe(confirmationIcon);
	});
});