import React from 'react';
import {shallow} from 'enzyme';

import {CancelButton} from '../CancelButton/CancelButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		onClick: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<CancelButton {...props}/>);

	return {props, wrapper};
};

describe('CancelButton Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls onClick() prop after click the button', () => {
		const {wrapper, props} = setup({
			onClick: jest.fn()
		});

		wrapper.find('button').simulate('click');

		expect(props.onClick).toHaveBeenCalledTimes(1);
	});
});