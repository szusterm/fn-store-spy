import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {sendOrder} from '../../actions';

import './styles.scss';

export class SendOrderButton extends Component {
	constructor(props) {
		super(props);

		this.state = {
			sendingOrder: false
		};

		this.sendOrder = this.sendOrder.bind(this);
	}

	async sendOrder() {
		this.setSendingOrderState(true);

		const itemsIds = this.getItemsIds();
		await this.props.sendOrder(itemsIds);

		this.setSendingOrderState(false);
	}

	getItemsIds() {
		const {orderedItems} = this.props;

		const itemsIds = [];
		for (const {_id: orderedItemId} of orderedItems) {
			itemsIds.push(orderedItemId);
		}

		return itemsIds;
	}

	setSendingOrderState(sendingOrder) {
		const newState = Object.assign(
			this.state,
			{
				sendingOrder
			}
		);

		this.setState(newState);
	}

	isOrderEmpty() {
		const {orderedItems} = this.props;

		return (orderedItems.length === 0);
	}

	isOrderTooBig() {
		const {orderedItems, maxItemsInOrder} = this.props;

		return (orderedItems.length > maxItemsInOrder);
	}

	render() {
		const {sendingOrder} = this.state;

		return (
			<button
				className={'send-order-button'}
				disabled={(this.isOrderEmpty() || this.isOrderTooBig() || sendingOrder)}
				onClick={this.sendOrder}
			>
				Send order
			</button>
		);
	}
}

SendOrderButton.propTypes = {
	orderedItems: PropTypes.array, //redux
	maxItemsInOrder: PropTypes.number, //redux
	sendOrder: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items} = state.orderCreator;
	const {maxItemsInOrder} = state.config;

	return {
		orderedItems: items,
		maxItemsInOrder
	};
};

const mapDispatchToProps = {sendOrder};

export default connect(mapStateToProps, mapDispatchToProps)(SendOrderButton);