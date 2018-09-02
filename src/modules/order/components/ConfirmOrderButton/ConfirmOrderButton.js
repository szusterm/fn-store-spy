import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class ConfirmOrderButton extends Component {
	render() {
		return (
			<button className={'confirm-order-button'}>
				Send order
			</button>
		);
	}
}

export default ConfirmOrderButton;