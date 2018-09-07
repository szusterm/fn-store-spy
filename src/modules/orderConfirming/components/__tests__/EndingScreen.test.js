import React from 'react';
import {shallow} from 'enzyme';

import {EndingScreen} from '../EndingScreen/EndingScreen';

const setup = (propOverrides) => {
	const props = Object.assign({}, propOverrides);

	const wrapper = shallow(<EndingScreen {...props}/>);

	return {props, wrapper};
};

describe('EndingScreen Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});