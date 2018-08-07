import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class ItemCard extends Component {
	render() {
		const {name, price, rarity, imageSrc} = this.props;

		return (
			<div className={`item-card item-card--raised item-card--${rarity}`}>
				<div className={'item-card--img-box'}>
					<img
						className={'img-box--image'}
						src={imageSrc}
					/>
				</div>
				<div className={'item-card--description'}>
					<div className={'description--name'}>{name}</div>
					<div className={'description--price'}>{price}</div>
				</div>
			</div>
		);
	}
}

ItemCard.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	rarity: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired
};

export default ItemCard;