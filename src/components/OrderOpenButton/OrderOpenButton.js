import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class OrderOpenButton extends Component {
	render() {
		return (
			<div className={'order-open-button'}>
				<div className={'material-icons'}>
					<span className={'order-open-button--icon'}>shopping_basket</span>
				</div>
			</div>
		);
	}
}

export default OrderOpenButton;