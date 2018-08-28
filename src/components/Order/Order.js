import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {closeOrderList} from '../../redux/actions';

import ItemOrderCard from '../ItemOrderCard';

import './styles.scss';

export class Order extends Component {

	checkThatOrderIsEmpty() {
		const {items} = this.props;

		const isEmpty = (items.length === 0);

		if (isEmpty) {
			this.props.closeOrderList();
		}

		return isEmpty;
	}

	getItemColsWidth() {
		const {items} = this.props;
		return (items.length <= 9) ? 4 : 3;
	}

	render() {
		const {items, listOpened} = this.props;

		return (
			<div className={`order ${(!listOpened || this.checkThatOrderIsEmpty()) && 'order--closed'}`}>
				<div className={'container-fluid'}>
					<div className={'row'}>
						<div className={'col-12'}>
							<button
								className={'order--close-button'}
								onClick={this.props.closeOrderList}
							>
								Close
							</button>
						</div>
					</div>
					<div className={'row order--list'}>
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
	listOpened: PropTypes.bool, //redux
	closeOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items, listOpened} = state.order;

	return {items, listOpened};
};

const mapDispatchToProps = {closeOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(Order);