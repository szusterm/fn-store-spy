import React from 'react';
import {shallow} from 'enzyme';

import CodeCopier from '../CodeCopier';
import CancelButton from '../../../../components/CancelButton';
import BlackCurtain from '../../../../components/BlackCurtain';

import {EndingScreen} from '../EndingScreen/EndingScreen';

const setup = (propOverrides) => {
	const props = Object.assign({
		endingScreenOpened: true, //redux
		hideEndingScreen: () => true
	}, propOverrides);

	const wrapper = shallow(<EndingScreen {...props}/>);

	return {props, wrapper};
};

describe('EndingScreen Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('hides, if endingScreenOpened is false', () => {
		const {wrapper} = setup();

		const hiddenEndingScreenClass = '.ending-screen--hidden';

		wrapper.setProps({endingScreenOpened: false});
		expect(wrapper.find(hiddenEndingScreenClass).exists()).toBe(true);

		wrapper.setProps({endingScreenOpened: true});
		expect(wrapper.find(hiddenEndingScreenClass).exists()).toBe(false);
	});

	it('hides if BlackCurtain calls onClick callback', () => {
		const {wrapper, props} = setup({
			hideEndingScreen: jest.fn()
		});

		wrapper.find(BlackCurtain).props().onClick();

		expect(props.hideEndingScreen).toHaveBeenCalledTimes(1);
	});

	it('puts listOpened from a redux state as a prop to BlackCurtain', () => {
		const {wrapper, props} = setup({
			endingScreenOpened: false
		});

		const showProp = wrapper.find(BlackCurtain).props().show;

		expect(showProp).toBe(props.endingScreenOpened);
	});

	it('hides if CancelButton calls onClick callback', () => {
		const {wrapper, props} = setup({
			hideEndingScreen: jest.fn()
		});

		wrapper.find(CancelButton).props().onClick();

		expect(props.hideEndingScreen).toHaveBeenCalledTimes(1);
	});

	it('renders CodeCopier', () => {
		const {wrapper} = setup();

		expect(wrapper.find(CodeCopier).exists()).toBe(true);
	});
});