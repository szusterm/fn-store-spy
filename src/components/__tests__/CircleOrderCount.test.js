import React from 'react';
import {shallow} from 'enzyme';

import {CircleOrderCount} from '../CircleOrderCount/CircleOrderCount';

const setup = (propOverrides) => {
	const props = Object.assign({
		items: []
	}, propOverrides);

	const wrapper = shallow(<CircleOrderCount {...props}/>);

	return {props, wrapper};
};

describe('CircleOrderCount Component', () => {

});