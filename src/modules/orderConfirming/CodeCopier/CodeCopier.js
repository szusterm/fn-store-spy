import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class CodeCopier extends Component {
	render() {
		return (
			<input
				className={'code-copier'}
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