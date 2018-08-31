import React from 'react';
import {shallow} from 'enzyme';

import {HideOrderButton} from '../HideOrderButton/HideOrderButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		closeOrderList: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<HideOrderButton {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls redux action to hide an order after click', () => {
		const {wrapper, props} = setup({
			closeOrderList: jest.fn()
		});

		wrapper.simulate('click');

		expect(props.closeOrderList).toHaveBeenCalledTimes(1);
	});
});