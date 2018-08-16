import React from 'react';
import {shallow} from 'enzyme';

import {Pagination} from '../Pagination/Pagination';

const setup = (propOverrides, stateOverrides) => {
	const props = Object.assign({
		onChange: () => true
	}, propOverrides);

	const state = Object.assign({
		nextPageAvailable: true
	}, stateOverrides);

	const wrapper = shallow(<Pagination {...state} {...props}/>);

	return {props, state, wrapper};
};

describe('Pagination Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls onChange() with current page after click next or previous button', () => {
		const startPage = 2;

		const {wrapper, props} = setup({
			onChange: jest.fn()
		});

		wrapper.setState({page: startPage});
		wrapper.find('.pagination--button--previous').simulate('click');
		expect(props.onChange).toHaveBeenCalledWith(startPage - 1);

		wrapper.setState({page: startPage});
		wrapper.find('.pagination--button--next').simulate('click');
		expect(props.onChange).toHaveBeenCalledWith(startPage + 1);
	});

	it('makes previous button disabled, if page equals to 1', () => {
		const {wrapper} = setup();

		wrapper.setState({page: 1});
		const isDisabledWithLower = wrapper.find('.pagination--button--previous').props().disabled;
		expect(isDisabledWithLower).toBe(true);

		wrapper.setState({page: 2});
		const isDisabledWithHigher = wrapper.find('.pagination--button--previous').props().disabled;
		expect(isDisabledWithHigher).toBe(false);
	});

	it('makes next button disabled, if next page does not exists', () => {
		const {wrapper} = setup();

		wrapper.setProps({nextPageAvailable: false});
		const isDisabledWithoutNextPage = wrapper.find('.pagination--button--next').props().disabled;
		expect(isDisabledWithoutNextPage).toBe(true);

		wrapper.setProps({nextPageAvailable: true});
		const isDisabledWithNextPage = wrapper.find('.pagination--button--next').props().disabled;
		expect(isDisabledWithNextPage).toBe(false);
	});
});