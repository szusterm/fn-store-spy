import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openOrderList} from '../../redux/actions';

import './styles.scss';

export class OrderOpenButton extends Component {
	checkThatOrderIsEmpty() {
		const {orderedItems} = this.props;
		return (orderedItems.length === 0);
	}

	render() {
		return (
			<button
				className={`order-open-button ${(this.checkThatOrderIsEmpty()) && 'order-open-button--closed'}`}
				onClick={this.props.openOrderList}
			>
				<div className={'material-icons'}>
					<span className={'order-open-button--icon'}>shopping_basket</span>
				</div>
			</button>
		);
	}
}

OrderOpenButton.propTypes = {
	orderedItems: PropTypes.array, //redux
	listOpened: PropTypes.bool, //redux
	openOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {listOpened, items} = state.order;
	return {
		orderedItems: items,
		listOpened
	};
};

const mapDispatchToProps = {openOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderOpenButton);