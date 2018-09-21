import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {removeItemFromOrderByIndex} from '../../actions';

import ItemCoin from '../../../../components/ItemCoin';

import './styles.scss';

export class ItemOrderCard extends Component {
	constructor(props) {
		super(props);

		this.removeItemFromOrder = this.removeItemFromOrder.bind(this);
	}

	removeItemFromOrder() {
		const {index} = this.props;
		this.props.removeItemFromOrderByIndex(index);
	}

	render() {
		const {name, imageSrc, rarity} = this.props;

		return (
			<button
				className={'item-order-card'}
				onClick={this.removeItemFromOrder}
			>
				<ItemCoin
					imageSrc={imageSrc}
					rarity={rarity}
					name={name}
				/>
				<div className={'item-order-card--action-box'}>
					<div className={'material-icons action-box--sign'}>
						<span>clear</span>
					</div>
				</div>
			</button>
		);
	}
}

ItemOrderCard.propTypes = {
	index: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired,
	removeItemFromOrderByIndex: PropTypes.func //redux
};

const mapDispatchToProps = {removeItemFromOrderByIndex};

export default connect(null, mapDispatchToProps)(ItemOrderCard);