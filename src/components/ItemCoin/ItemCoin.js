import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class ItemCoin extends Component {
	render() {
		const {imageSrc, rarity} = this.props;

		return (
			<div className={`item-coin item-coin--${rarity}`}>
				<img
					className={'item-coin--image'}
					src={imageSrc}
				/>
			</div>
		);
	}
}

ItemCoin.propTypes = {
	_id: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired
};

export default ItemCoin;