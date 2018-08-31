import React from 'react';
import {shallow} from 'enzyme';

import {OrderInfo} from '../OrderInfo/OrderInfo';

const setup = (propOverrides) => {
	const props = Object.assign({

	}, propOverrides);

	const wrapper = shallow(<OrderInfo {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});