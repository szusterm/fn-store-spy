import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemCard from '../ItemSearchCard';

import './styles.scss';

export class ItemsList extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'col-12 col-sm-12 col-md-11 col-lg-10 col-xl-8'}>
				<div className={'container-fluid'}>
					<div className={'row no-gutter'}>
						{
							items.map((item) => {
								const {_id, fnbrId, name, price, rarity, type, imageSrc} = item;

								return (
									<ItemCard
										key={_id}
										fnbrId={fnbrId}
										name={name}
										price={price}
										rarity={rarity}
										type={type}
										imageSrc={imageSrc}
									/>
								);
							})
						}
					</div>
				</div>
			</div>
		);
	}
}

ItemsList.propTypes = {
	items: PropTypes.array
};

export default ItemsList;