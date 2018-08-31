import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openOrderList} from '../../../../redux/actions';

import CircleOrderCount from '../CircleOrderCount/index';

import './styles.scss';

export class OrderOpenButton extends Component {
	checkThatOrderIsEmpty() {
		const {orderedItems} = this.props;
		return (orderedItems.length === 0);
	}

	render() {
		return (
			<button
				className={`order-open-button ${(this.checkThatOrderIsEmpty()) && 'order-open-button--hidden'}`}
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
	const {items} = state.order;
	return {
		orderedItems: items,
	};
};

const mapDispatchToProps = {openOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderOpenButton);