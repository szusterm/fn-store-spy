import React from 'react';
import {shallow} from 'enzyme';

import {CancelButton} from '../CancelButton/CancelButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		closeOrderList: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<CancelButton {...props}/>);

	return {props, wrapper};
};

describe('CancelButton Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls redux action to hide an order after click', () => {
		const {wrapper, props} = setup({
			closeOrderList: jest.fn()
		});

		wrapper.find('button').simulate('click');

		expect(props.closeOrderList).toHaveBeenCalledTimes(1);
	});
});