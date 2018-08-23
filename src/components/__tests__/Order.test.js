import React from 'react';
import {shallow} from 'enzyme';

import {Order} from '../Order/Order';

const setup = (propOverrides) => {
	const props = Object.assign({

	}, propOverrides);

	const wrapper = shallow(<Order {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {

});