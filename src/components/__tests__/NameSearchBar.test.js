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

	it('calls redux action to change the name filter after every input change', () => {
		const nameToInput = 'Super axe';

		const {wrapper, props} = setup({
			minNameFilterLength: 0,
			setNameFilter: jest.fn()
		});

		const input = wrapper.find('.name-search-bar--input');

		input.simulate('change', {target: {value: 'Super axe'}});

		expect(props.setNameFilter).toHaveBeenCalledWith(nameToInput);
	});
});