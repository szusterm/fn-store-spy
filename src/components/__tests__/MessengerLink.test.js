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

	it('changes styles, if reversed prop is true', () => {
		const {wrapper} = setup();

		const reversedClass = '.messenger-link--button--reversed';

		wrapper.setProps({reversed: false});
		expect(wrapper.find(reversedClass).exists()).toBe(false);

		wrapper.setProps({reversed: true});
		expect(wrapper.find(reversedClass).exists()).toBe(true);
	});
});