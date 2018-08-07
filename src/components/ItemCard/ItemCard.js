import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class ItemCard extends Component {
	render() {
		const {name, price, rarity, imageSrc} = this.props;

		return (
			<div className={'item-card item-card--raised'}>
				<div className={'item-card--top-part'}>
					<div className={`top-part--img-box top-part--img-box--${rarity}`}>
						<img
							className={'img-box--image'}
							src={imageSrc}
						/>
					</div>
				</div>
				<div className={'item-card--bot-part'}>
					<div className={'bot-part--description'}>
						<div className={'description--name'}>{name}</div>
						<div className={'description--price'}>{price}</div>
					</div>
				</div>
			</div>
		);
	}
}

ItemCard.propTypes = {
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired
};

export default ItemCard;