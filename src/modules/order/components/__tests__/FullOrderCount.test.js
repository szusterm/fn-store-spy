import React from 'react';
import {shallow} from 'enzyme';

import {FullOrderCount} from '../FullOrderCount/FullOrderCount';

const setup = (propOverrides) => {
	const props = Object.assign({
		orderedItems: ['item1'], //redux
		maxItemsInOrder: 3 //redux
	}, propOverrides);

	const wrapper = shallow(<FullOrderCount {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows a count of items in the order', () => {});

	it('shows a maximum count of items in the order', () => {});

	it('changes count styles if the order is too big', () => {});
});