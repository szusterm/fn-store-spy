import React from 'react';
import {shallow} from 'enzyme';

import MessengerLink from '../MessengerLink';

import {Header} from '../Header/Header';

const setup = (propOverrides) => {
	const props = Object.assign({}, propOverrides);

	const wrapper = shallow(<Header {...props}/>);

	return {props, wrapper};
};

describe('Header Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('renders MessengerLink', () => {
		const {wrapper} = setup();

		expect(wrapper.find(MessengerLink).exists()).toBe(true);
	});

	it('puts reversed prop to MessengerLink', () => {
		const {wrapper} = setup();

		const reversed = wrapper.find(MessengerLink).props().reversed;

		expect(reversed).toBe(true);
	});
});