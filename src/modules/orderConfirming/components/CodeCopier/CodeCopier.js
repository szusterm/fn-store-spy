import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class CodeCopier extends Component {

	copyToClipboard() {
		document.execCommand('copy');
	}

	selectAll(event) {
		event.target.select();
	}

	render() {
		const {code} = this.props;

		return (
			<input
				className={'code-copier'}
				readOnly={true}
				onFocus={this.selectAll}
				onClick={this.copyToClipboard}
				value={code}
			/>
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