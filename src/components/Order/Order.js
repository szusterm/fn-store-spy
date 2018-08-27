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

	render() {
		const {items} = this.props;

		return (
			<div className={`order ${(this.checkThatIsEmpty()) && 'order--closed'}`}>
				<div className={'container-fluid order--list'}>
					<div className={'row'}>
						{
							items.map((item, index) => {
								const {_id, imageSrc, rarity} = item;

								return (
									<div
										key={_id}
										className={'col-3 list--item-box'}
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
	items: PropTypes.array //redux
};

const mapStateToProps = (state) => {
	const {items} = state.order;

	return {items};
};

export default connect(mapStateToProps, null)(Order);