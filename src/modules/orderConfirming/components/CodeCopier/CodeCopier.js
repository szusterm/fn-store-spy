import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './styles.scss';

export class CodeCopier extends Component {
	constructor(props) {
		super(props);

		this.state = {
			copied: false
		};

		this.setCopiedTrue = this.setCopiedTrue.bind(this);
	}

	setCopiedTrue() {
		const newState = Object.assign(
			this.state,
			{copied: true}
		);

		this.setState(newState);
	}

	render() {
		const {code} = this.props;
		const {copied} = this.state;

		return (
			<div className={'code-copier'}>
				<CopyToClipboard
					text={code}
					onCopy={this.setCopiedTrue}
				>
					<div className={`code-copier--code ${(copied) ? 'code-copier--code--copied' : ''}`}>{code}</div>
				</CopyToClipboard>
				<div className={'code-copier--info'}>
					{(!copied) && <span className={'code-copier--info--how-to'}>click to copy</span>}
					{(copied) && <span className={'code-copier--info--copied'}>copied to clipboard!</span>}
				</div>
			</div>
		);
	}
}

CodeCopier.propTypes = {
	code: PropTypes.string //redux
};

const mapStateToProps = (state) => {
	const {code} = state.orderConfirming;

	return {code};
};

export default connect(mapStateToProps, null)(CodeCopier);