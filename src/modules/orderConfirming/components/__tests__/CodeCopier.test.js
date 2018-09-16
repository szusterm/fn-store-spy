import React from 'react';
import {shallow} from 'enzyme';
import CopyToClipboard from 'react-copy-to-clipboard';

import {CodeCopier} from '../CodeCopier/CodeCopier';

const setup = (propOverrides) => {
	const props = Object.assign({
		code: 'h4yz', //redux
		codePrefix: 'fn' //redux
	}, propOverrides);

	const wrapper = shallow(<CodeCopier {...props}/>);

	return {props, wrapper};
};

describe('CodeCopier Component', () => {
	it('renders correctly', () => {
		const {wrapper} = setup();

		expect(wrapper).toMatchSnapshot();
	});

	it('shows the code from a store with a specified prefix', () => {
		const {wrapper, props} = setup({
			code: '5g6u',
			codePrefix: 'ss'
		});

		const inputValue = wrapper.find('.code-copier--code').text();

		expect(inputValue).toBe(props.codePrefix + props.code);
	});

	it('copies the code with the prefix after click through CopyToClipboard', () => {
		const {wrapper, props} = setup({
			code: '5g6u',
			codePrefix: 'fn'
		});

		const textToCopy = wrapper.find(CopyToClipboard).props().text;

		expect(textToCopy).toBe(props.codePrefix + props.code);
	});

	it('changes an information text, if the last copied code equals to the current code', () => {
		const {wrapper} = setup();

		const howToTextClass = '.info--how-to';
		const copiedTextClass = '.info--copied';

		wrapper.setState({lastCopiedCode: 'meme'});
		wrapper.setProps({code: 'youe'});

		expect(wrapper.find(howToTextClass).exists()).toBe(true);
		expect(wrapper.find(copiedTextClass).exists()).toBe(false);

		wrapper.setState({lastCopiedCode: 'ziu'});
		wrapper.setProps({code: 'ziu'});

		expect(wrapper.find(howToTextClass).exists()).toBe(false);
		expect(wrapper.find(copiedTextClass).exists()).toBe(true);
	});

	it('changes the code background color, if the last copied code equals to the current code', () => {
		const {wrapper} = setup();

		const codeCopiedClass = '.code-copier--code--copied';

		wrapper.setState({lastCopiedCode: 'meme'});
		wrapper.setProps({code: 'youe'});

		expect(wrapper.find(codeCopiedClass).exists()).toBe(false);

		wrapper.setState({lastCopiedCode: 'ziu'});
		wrapper.setProps({code: 'ziu'});

		expect(wrapper.find(codeCopiedClass).exists()).toBe(true);
	});
});