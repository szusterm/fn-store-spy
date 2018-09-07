import React from 'react';
import {shallow} from 'enzyme';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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

	it('shows the code from a store', () => {
		const {wrapper, props} = setup({
			code: 'fn5g6u'
		});

		const inputValue = wrapper.find('.code-copier--code').text();

		expect(inputValue).toBe(props.code);
	});

	it('copies the code after click through CopyToClipboard', () => {
		const {wrapper, props} = setup({
			code: 'fn5g6u'
		});

		const textToCopy = wrapper.find(CopyToClipboard).props().text;

		expect(textToCopy).toBe(props.code);
	});

	it('changes information text after copy', () => {
		const {wrapper} = setup();

		const howToTextClass = '.info--how-to';
		const copiedTextClass = '.info--copied';

		expect(wrapper.find(howToTextClass).exists()).toBe(true);
		expect(wrapper.find(copiedTextClass).exists()).toBe(false);

		wrapper.setState({copied: true});

		expect(wrapper.find(howToTextClass).exists()).toBe(false);
		expect(wrapper.find(copiedTextClass).exists()).toBe(true);
	});

	it('changes information text after copy', () => {
		const {wrapper} = setup();

		const codeCopiedClass = '.code-copier--code--copied';

		expect(wrapper.find(codeCopiedClass).exists()).toBe(false);

		wrapper.setState({copied: true});

		expect(wrapper.find(codeCopiedClass).exists()).toBe(true);
	});
});