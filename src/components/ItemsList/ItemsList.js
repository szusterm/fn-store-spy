import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCard from '../ItemCard';

import './styles.scss';

class ItemsList extends Component {
	render() {
		const {items} = this.props;

		return (
			<div>
				{
					items.map((item) => {
						const {key, name, price, rarity, imgSrc} = item;

						return (
							<ItemCard
								key={key}
								name={name}
								price={price}
								rarity={rarity}
								imgSrc={imgSrc}
							/>
						);
					})
				}
			</div>
		);
	}
}

ItemsList.propTypes = {
	items: PropTypes.array
};

export default ItemsList;