import React from 'react';
import {shallow} from 'enzyme';

import {ConfirmOrderButton} from '../ConfirmOrderButton/ConfirmOrderButton';

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems: [], //redux
		maxItemsInOrder: 3 //redux
	}, propOverrides);

	const wrapper = shallow(<ConfirmOrderButton {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});
});