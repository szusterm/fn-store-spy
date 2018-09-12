import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CopyToClipboard from 'react-copy-to-clipboard';

import './styles.scss';

export class CodeCopier extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lastCopiedCode: ''
		};

		this.isCurrentCodeCopied = this.isCurrentCodeCopied.bind(this);
	}

	updateLastCopiedCode() {
		const {code} = this.props;

		const newState = Object.assign(
			this.state,
			{lastCopiedCode: code}
		);

		this.setState(newState);
	}

	isCurrentCodeCopied() {
		const {lastCopiedCode} = this.state;
		const {code} = this.props;

		return (code === lastCopiedCode);
	}

	render() {
		const {code} = this.props;

		return (
			<div className={'code-copier'}>
				<CopyToClipboard
					text={code}
					onCopy={() => this.updateLastCopiedCode()}
				>
					<div className={`code-copier--code ${(this.isCurrentCodeCopied()) ? 'code-copier--code--copied' : ''}`}>
						{code}
					</div>
				</CopyToClipboard>
				<div className={'code-copier--info'}>
					{(!this.isCurrentCodeCopied()) && <span className={'info--how-to'}>click to copy</span>}
					{(this.isCurrentCodeCopied()) && <span className={'info--copied'}>copied to clipboard!</span>}
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