import React from 'react';
import {shallow} from 'enzyme';
import configureStore from 'redux-mock-store';

import Pagination from '../Pagination';

const setup = (propOverrides, stateOverrides) => {
		const props = Object.assign({
			onChange: () => true
		}, propOverrides);

		const state = Object.assign({
			onChange: () => true
		}, stateOverrides);

		const store = configureStore(state);

		const wrapper = shallow(<Pagination store={store} {...props}/>);

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
});