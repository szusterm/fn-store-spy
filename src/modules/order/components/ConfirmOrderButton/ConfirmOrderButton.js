import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendOrder} from '../../actions';

import './styles.scss';

export class ConfirmOrderButton extends Component {
	checkThatOrderIsEmpty() {
		const {orderedItems} = this.props;

		return (orderedItems.length === 0);
	}

	checkThatOrderIsTooBig() {
		const {orderedItems, maxItemsInOrder} = this.props;

		return (orderedItems.length > maxItemsInOrder);
	}

	render() {
		return (
			<button
				className={'confirm-order-button'}
				disabled={(this.checkThatOrderIsEmpty() || this.checkThatOrderIsTooBig())}
			>
				Send order
			</button>
		);
	}
}

ConfirmOrderButton.propTypes = {
	orderedItems: PropTypes.array, //redux
	maxItemsInOrder: PropTypes.number, //redux
	sendOrder: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items} = state.order;
	const {maxItemsInOrder} = state.config;

	return {
		orderedItems: items,
		maxItemsInOrder
	};
};

const mapDispatchToProps = {sendOrder};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOrderButton);