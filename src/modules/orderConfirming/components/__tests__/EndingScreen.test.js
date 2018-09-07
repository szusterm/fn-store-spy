import React from 'react';
import {shallow} from 'enzyme';

import {EndingScreen} from '../EndingScreen/EndingScreen';

const setup = (propOverrides) => {
	const props = Object.assign({
		endingScreenOpened: true //redux
	}, propOverrides);

	const wrapper = shallow(<EndingScreen {...props}/>);

	return {props, wrapper};
};

describe('EndingScreen Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('hides, if endingScreenOpened is false', () => {
		const {wrapper} = setup();

		const hiddenEndingScreenClass = '.ending-screen--hidden';

		wrapper.setProps({endingScreenOpened: false});
		expect(wrapper.find(hiddenEndingScreenClass).exists()).toBe(true);

		wrapper.setProps({endingScreenOpened: true});
		expect(wrapper.find(hiddenEndingScreenClass).exists()).toBe(false);
	});
});