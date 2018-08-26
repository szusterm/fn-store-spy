import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCoin from '../ItemCoin';

import './styles.scss';

export class ItemOrderCard extends Component {
	render() {
		const {imageSrc, rarity} = this.props;

		return (
			<div className={'item-order-card'}>
				<ItemCoin
					imageSrc={imageSrc}
					rarity={rarity}
				/>
			</div>
		);
	}
}

ItemOrderCard.propTypes = {
	index: PropTypes.number.isRequired,
	imageSrc: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired,
};

export default ItemOrderCard;