import React from 'react';
import {shallow} from 'enzyme';

import {Pagination} from '../Pagination/Pagination';

const setup = (propOverrides) => {
	const props = Object.assign({
		onChange: () => true,
		setPageFilter: () => true, //redux
		page: 1, //redux
		nextPageAvailable: true //redux
	}, propOverrides);

	const wrapper = shallow(<Pagination {...props}/>);

	return {props, wrapper};
};

describe('Pagination Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('calls onChange() after click the next or the previous button', () => {
		const startPage = 2;

		const {wrapper, props} = setup({
			onChange: jest.fn(),
			page: startPage,
			nextPageAvailable: true
		});

		wrapper.find('.pagination--button--previous').simulate('click');
		wrapper.find('.pagination--button--next').simulate('click');

		expect(props.onChange).toHaveBeenCalledTimes(2);
	});

	it('calls a redux action to change the page after click a button', () => {
		const startPage = 2;

		const {wrapper, props} = setup({
			setPageFilter: jest.fn()
		});

		wrapper.setProps({page: startPage});
		wrapper.find('.pagination--button--previous').simulate('click');
		expect(props.setPageFilter).toHaveBeenCalledWith(startPage - 1);

		wrapper.setProps({page: startPage});
		wrapper.find('.pagination--button--next').simulate('click');
		expect(props.setPageFilter).toHaveBeenCalledWith(startPage + 1);
	});

	it('makes the previous button disabled, if the page equals to 1', () => {
		const {wrapper} = setup();

		wrapper.setProps({page: 1});
		const isDisabledWithLower = wrapper.find('.pagination--button--previous').props().disabled;
		expect(isDisabledWithLower).toBe(true);

		wrapper.setProps({page: 2});
		const isDisabledWithHigher = wrapper.find('.pagination--button--previous').props().disabled;
		expect(isDisabledWithHigher).toBe(false);
	});

	it('makes the next button disabled, if the next page does not exists', () => {
		const {wrapper} = setup();

		wrapper.setProps({nextPageAvailable: false});
		const isDisabledWithoutNextPage = wrapper.find('.pagination--button--next').props().disabled;
		expect(isDisabledWithoutNextPage).toBe(true);

		wrapper.setProps({nextPageAvailable: true});
		const isDisabledWithNextPage = wrapper.find('.pagination--button--next').props().disabled;
		expect(isDisabledWithNextPage).toBe(false);
	});
});