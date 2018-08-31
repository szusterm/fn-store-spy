import React from 'react';
import {shallow} from 'enzyme';

import {BlackCurtain} from '../BlackCurtain/BlackCurtain';

const setup = (propOverrides) => {
	const props = Object.assign({
		show: true,
		onClick: () => true
	}, propOverrides);

	const wrapper = shallow(<BlackCurtain {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});