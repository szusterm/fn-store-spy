import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {CopyToClipBoard} from 'react-copy-to-clipboard';

import './styles.scss';

export class CodeCopier extends Component {
	render() {
		const {code} = this.props;

		return (
			<input
				className={'code-copier'}
				readOnly={true}
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