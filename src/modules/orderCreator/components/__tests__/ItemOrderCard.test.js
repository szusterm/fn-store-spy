import React from 'react';
import {shallow} from 'enzyme';

import ItemCoin from '../../../../components/ItemCoin';

import {ItemOrderCard} from '../ItemOrderCard/ItemOrderCard';

const setup = (propOverrides) => {
	const props = Object.assign({
		index: 0,
		imageSrc: 'example.com',
		rarity: 'uncommon',
		removeItemFromOrderByIndex: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<ItemOrderCard {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
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

	it('after click the component, removes the item from an order', () => {
		const {wrapper, props} = setup({
			index: 5,
			removeItemFromOrderByIndex: jest.fn(),
		});

		wrapper.simulate('click');

		expect(props.removeItemFromOrderByIndex).toHaveBeenCalledWith(props.index);
	});
});