import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ItemOrderCard from '../ItemOrderCard';

import './styles.scss';

export class Order extends Component {

	checkThatIsEmpty() {
		const {items} = this.props;
		return (items.length === 0);
	}

	getItemColsWidth() {
		const {items} = this.props;
		return (items.length <= 9) ? 4 : 3;
	}

	render() {
		const {items, listOpened} = this.props;

		return (
			<div className={`order ${(!listOpened && !this.checkThatIsEmpty()) && 'order--closed'}`}>
				<div className={'container-fluid order--list'}>
					<div className={'row'}>
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
				</div>
				<div className={'order--confirmation-box'}/>
			</div>
		);
	}
}

Order.propTypes = {
	items: PropTypes.array, //redux
	listOpened: PropTypes.bool //redux
};

const mapStateToProps = (state) => {
	const {items, listOpened} = state.order;

	return {items, listOpened};
};

export default connect(mapStateToProps, null)(Order);