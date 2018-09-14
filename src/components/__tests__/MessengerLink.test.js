import React from 'react';
import {shallow} from 'enzyme';

import {MessengerLink} from '../MessengerLink/MessengerLink';

const setup = (propOverrides) => {
	const props = Object.assign({
		reversed: false
	}, propOverrides);

	const wrapper = shallow(<MessengerLink {...props}/>);

	return {props, wrapper};
};

describe('MessengerLink Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});