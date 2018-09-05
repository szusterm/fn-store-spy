import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendOrder} from '../../actions';

import './styles.scss';

export class ConfirmOrderButton extends Component {
	constructor(props) {
		super(props);

		this.sendOrder = this.sendOrder.bind(this);
	}

	sendOrder() {
		const itemsIds = this.getItemsIds();
		this.props.sendOrder(itemsIds);
	}

	getItemsIds() {
		const {orderedItems} = this.props;

		const itemsIds = [];
		for (const {_id: orderedItemId} of orderedItems) {
			itemsIds.push(orderedItemId);
		}

		return itemsIds;
	}

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
				onClick={this.sendOrder}
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