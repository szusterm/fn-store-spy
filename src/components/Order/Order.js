import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class Order extends Component {
	render() {
		return (
			<div className={'order'}>
				<div className={'order--list'}>

				</div>
				<div className={'order--confirmation-box'}/>
			</div>
		);
	}
}

export default Order;