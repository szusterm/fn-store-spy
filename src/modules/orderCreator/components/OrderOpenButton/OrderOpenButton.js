import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openOrderList} from '../../actions';

import CircleOrderCount from '../CircleOrderCount';

import './styles.scss';

export class OrderOpenButton extends Component {
	isOrderEmpty() {
		const {orderedItems} = this.props;
		return (orderedItems.length === 0);
	}

	render() {
		return (
			<button
				className={`order-open-button ${(this.isOrderEmpty()) && 'order-open-button--hidden'}`}
				onClick={this.props.openOrderList}
			>
				<div className={'material-icons'}>
					<span className={'order-open-button--icon'}>shopping_basket</span>
				</div>
				<div className={'order-open-button--items-count'}>
					<CircleOrderCount/>
				</div>
			</button>
		);
	}
}

OrderOpenButton.propTypes = {
	orderedItems: PropTypes.array, //redux
	openOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items} = state.orderCreator;
	return {
		orderedItems: items
	};
};

const mapDispatchToProps = {openOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderOpenButton);