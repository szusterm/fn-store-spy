import React from 'react';
import {shallow} from 'enzyme';

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
});