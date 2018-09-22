import React from 'react';
import {shallow} from 'enzyme';

import {MessengerLink} from '../MessengerLink/MessengerLink';

const setup = (propOverrides) => {
	const props = Object.assign({
		reversed: false,
		messengerUrl: 'https://m.me'
	}, propOverrides);

	const wrapper = shallow(<MessengerLink {...props}/>);

	return {props, wrapper};
};

describe('MessengerLink Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('puts messengerUrl from a store to href in "a" element', () => {
		const {wrapper, props} = setup({
			messengerUrl: 'https://m.me'
		});

		const hrefLink = wrapper.find('a').props().href;

		expect(hrefLink).toBe(props.messengerUrl);
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