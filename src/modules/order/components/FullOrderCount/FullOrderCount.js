import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class FullOrderCount extends Component {
	checkThatOrderIsTooBig() {
		const {orderedItems, maxItemsInOrder} = this.props;

		return (orderedItems.length > maxItemsInOrder);
	}

	render() {
		const {orderedItems, maxItemsInOrder} = this.props;

		return (
			<div className={'full-order-count'}>
				<span
					className={`full-order-count--ordered ${(this.checkThatOrderIsTooBig()) && 'full-order-count--ordered--exceeded'}`}
				>
					{orderedItems.length}
				</span>
				<span>/</span>
				<span className={'full-order-count--maximum'}>
					{maxItemsInOrder}
				</span>
			</div>
		);
	}
}

FullOrderCount.propTypes = {
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

export default connect(mapStateToProps, null)(FullOrderCount);