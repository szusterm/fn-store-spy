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
});