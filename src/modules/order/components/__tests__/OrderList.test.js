import React from 'react';
import {shallow} from 'enzyme';

import {OrderList} from '../OrderList/OrderList';

const setup = (propOverrides) => {
	const props = Object.assign({}, propOverrides);

	const wrapper = shallow(<OrderList {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});