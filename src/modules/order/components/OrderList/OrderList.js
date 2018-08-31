import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ItemOrderCard from '../ItemOrderCard';

import './styles.scss';

export class OrderList extends Component {
	getItemColsWidth() {
		const {items} = this.props;
		return (items.length <= 9) ? 4 : 3;
	}

	render() {
		const {items} = this.props;

		return (
			<div>
				{
					items.map((item, index) => {
						const {_id, imageSrc, rarity} = item;

						return (
							<div
								key={_id}
								className={`col-${this.getItemColsWidth()} list--item-box`}
							>
								<ItemOrderCard
									index={index}
									imageSrc={imageSrc}
									rarity={rarity}
								/>
							</div>
						);
					})
				}
			</div>
		);
	}
}

OrderList.propTypes = {
	items: PropTypes.array //redux
};

const mapStateToProps = (state) => {
	const {items} = state.order;
	return {items};
};

export default connect(mapStateToProps, null)(OrderList);