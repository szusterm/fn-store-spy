import React from 'react';
import {shallow} from 'enzyme';

import Pagination from '../Pagination';

const setup = (propOverrides) => {
		const props = Object.assign({
			onChange: () => true
		}, propOverrides);

		const wrapper = shallow(<Pagination {...props}/>);

		return {props, wrapper};
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
});