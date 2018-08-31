import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {closeOrderList} from '../../actions';

import BlackCurtain from '../../../../components/BlackCurtain';
import HideOrderButton from '../HideOrderButton';
import ItemOrderCard from '../ItemOrderCard';

import './styles.scss';

export class OrderInfo extends Component {

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
		const {items, listOpened, closeOrderList} = this.props;

		return (
			<div>
				<BlackCurtain
					show={listOpened}
					onClick={closeOrderList}
				/>
				<div className={`order-info ${(!listOpened || this.checkThatOrderIsEmpty()) && 'order-info--hidden'}`}>
					<div className={'container-fluid'}>
						<div className={'row order-info--button-box'}>
							<div className={'col-8'}>
								<HideOrderButton/>
							</div>
						</div>
						<div className={'row order-info--list'}>
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
					<div className={'order-info--confirmation-box'}/>
				</div>
			</div>
		);
	}
}

OrderInfo.propTypes = {
	items: PropTypes.array, //redux
	listOpened: PropTypes.bool, //redux
	closeOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items, listOpened} = state.order;

	return {items, listOpened};
};

const mapDispatchToProps = {closeOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);