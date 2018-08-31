import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCard from '../ItemSearchCard/index';

import './styles.scss';

export class ItemsList extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'container-fluid'}>
				<div className={'row no-gutter'}>
					{
						items.map((item) => {
							const {_id, name, price, rarity, type, imageSrc} = item;

							return (
								<div
									key={_id}
									className={'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3'}
								>
									<ItemCard
										_id={_id}
										name={name}
										price={price}
										rarity={rarity}
										type={type}
										imageSrc={imageSrc}
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