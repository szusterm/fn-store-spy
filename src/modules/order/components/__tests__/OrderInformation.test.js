import React from 'react';
import {shallow} from 'enzyme';

import {OrderInformation} from '../OrderInformation/OrderInformation';

const setup = (propOverrides) => {
	const props = Object.assign({

	}, propOverrides);

	const wrapper = shallow(<OrderInformation {...props}/>);

	return {props, wrapper};
};

describe('Order Component', () => {

});