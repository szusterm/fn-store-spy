import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class ItemCard extends Component {
	isOrdered(orderedItem) {
		const {id} = this.props;

		return (id === orderedItem.id);
	}

	render() {
		const {name, price, rarity, type, imageSrc} = this.props;

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
					<div className={'bot-part--name'}>{name}</div>
					<div className={'bot-part--description'}>
						<div className={'description--type'}>{type}</div>
						<div className={'description--price'}>{price}</div>
					</div>
				</div>
			</div>
		);
	}
}

ItemCard.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	orderedItems: PropTypes.array //redux
};

const mapStateToProps = (state) => {
	const {items: orderedItems} = state.order;
	return {orderedItems};
};

export default connect(mapStateToProps, null)(ItemCard);