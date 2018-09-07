import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import './styles.scss';

export class CodeCopier extends Component {
	render() {
		const {code} = this.props;

		return (
			<CopyToClipboard text={code}>
				<div className={'code-copier'}>{code}</div>
			</CopyToClipboard>
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