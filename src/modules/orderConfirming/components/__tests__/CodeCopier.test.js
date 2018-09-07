import React from 'react';
import {shallow} from 'enzyme';

import {CodeCopier} from '../CodeCopier/CodeCopier';

const setup = (propOverrides) => {
	const props = Object.assign({
		code: 'fnh4y' //redux
	}, propOverrides);

	const wrapper = shallow(<CodeCopier {...props}/>);

	return {props, wrapper};
};

describe('CodeCopier Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows the code in an input', () => {
		const {wrapper, props} = setup({
			code: 'fn5g6u'
		});

		const inputValue = wrapper.find('input').props().value;

		expect(inputValue).toBe(props.code);
	});

	it('the code input is read only', () => {
		const {wrapper} = setup();

		const readOnly = wrapper.find('input').props().readOnly;

		expect(readOnly).toBe(true);
	});
});