import React from 'react';
import {shallow} from 'enzyme';

import {NameSearchBar} from '../NameSearchBar/NameSearchBar';

const setup = (propOverrides) => {
	const props = Object.assign({
		onChange: () => true,
		name: '', //redux
		minNameFilterLength: 3, //redux
		maxNameFilterLength: 26, //redux
		setNameFilter: () => true //redux
	}, propOverrides);

	const wrapper = shallow(<NameSearchBar {...props}/>);

	return {props, wrapper};
};

describe('NameSearchBar Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});