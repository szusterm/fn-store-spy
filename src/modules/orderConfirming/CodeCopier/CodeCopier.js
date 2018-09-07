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

export default connect()(CodeCopier);