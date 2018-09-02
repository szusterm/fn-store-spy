import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

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

ConfirmOrderButton.propTypes = {
	orderedItems: PropTypes.array, //redux
	maxItemsInOrder: PropTypes.number //redux
};

const mapStateToProps = (state) => {
	const {items} = state.order;
	const {maxItemsInOrder} = state.config;

	return {
		orderedItems: items,
		maxItemsInOrder
	};
};

export default connect(mapStateToProps, null)(ConfirmOrderButton);