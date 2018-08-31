import React from 'react';
import {shallow} from 'enzyme';

import {NameSearchBar} from '../../modules/searching/components/NameSearchBar/NameSearchBar';

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

		input.simulate('change', {target: {value: nameToInput}});

		expect(props.setNameFilter).toHaveBeenCalledWith(nameToInput);
	});

	it('if name input value is too short, action is calling with empty name', () => {
		const tooShortName = 'two';
		const emptyName = '';

		const {wrapper, props} = setup({
			minNameFilterLength: 6,
			setNameFilter: jest.fn()
		});

		const input = wrapper.find('.name-search-bar--input');

		input.simulate('change', {target: {value: tooShortName}});

		expect(props.setNameFilter).toHaveBeenCalledWith(emptyName);
	});

	it('calls onChange() prop after every change' , () => {
		const {wrapper, props} = setup({
			minNameFilterLength: 0,
			onChange: jest.fn()
		});

		const input = wrapper.find('.name-search-bar--input');

		input.simulate('change', {target: {value: 'Something'}});

		expect(props.onChange).toHaveBeenCalledTimes(1);
	});

	it('adds maximum length from store to input', () => {
		const {wrapper, props} = setup({
			maxNameFilterLength: 23
		});

		const setMaxLength = wrapper.find('input').props().maxLength;

		expect(setMaxLength).toBe(props.maxNameFilterLength);
	});
});