import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCard from '../ItemCard';

import './styles.scss';

class ItemsList extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'container'}>
				<div className={'row no-gutter'}>
					{
						items.map((item) => {
							const {key, name, price, rarity, imgSrc} = item;

							return (
								<div
									key={key}
									className={'col-2'}
								>
									<ItemCard
										name={name}
										price={price}
										rarity={rarity}
										imgSrc={imgSrc}
									/>
								</div>
							);
						})
					}
				</div>
			</div>
		);
	}
}

ItemsList.propTypes = {
	items: PropTypes.array
};

export default ItemsList;