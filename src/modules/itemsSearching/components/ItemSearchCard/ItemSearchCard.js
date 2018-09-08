import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addItemToOrder, removeItemFromOrderByIndex} from '../../../orderCreator/actions';

import ItemCoin from '../../../../components/ItemCoin';

import './styles.scss';
import orderCreator from "../../../orderCreator/reducer";

export class ItemSearchCard extends Component {
	constructor() {
		super();

		this.switchOrder = this.switchOrder.bind(this);
		this.isItemOrdered = this.isItemOrdered.bind(this);
	}

	switchOrder() {
		const {_id, name, rarity, imageSrc} = this.props;

		const indexInOrder = this.getIndexInOrder();

		if (indexInOrder === null) {
			const item = {
				_id,
				name,
				rarity,
				imageSrc
			};

			this.props.addItemToOrder(item);
		}
		else {
			this.props.removeItemFromOrderByIndex(indexInOrder);
		}
	}

	getIndexInOrder() {
		const {_id} = this.props;
		const {orderedItems} = this.props;

		let indexInOrder = null;

		orderedItems.find((orderedItem, orderedItemIndex) => {
			if (_id === orderedItem._id) {
				indexInOrder = orderedItemIndex;
			}
		});

		return indexInOrder;
	}

	isItemOrdered() {
		return (this.getIndexInOrder() !== null);
	}

	render() {
		const {name, price, rarity, type, imageSrc} = this.props;

		return (
			<div className={'col-6 col-sm-6 col-md-4 col-lg-3 col-xl-3'}>
				<button
					className={'item-search-card item-search-card--raised'}
					onClick={this.switchOrder}
				>
					<div className={'item-search-card--top-part'}>
						<div className={'top-part--visual-box'}>
							<ItemCoin
								imageSrc={imageSrc}
								rarity={rarity}
							/>
							<div
								className={`visual-box--action-box ${(this.isItemOrdered()) && 'visual-box--action-box--active'}`}
							>
								<div className={'material-icons action-box--sign'}>
									<span>{(this.isItemOrdered()) ? 'done' : 'add'}</span>
								</div>
							</div>
						</div>
					</div>
					<div className={'item-search-card--bot-part'}>
						<div className={'bot-part--name'}>{name}</div>
						<div className={'bot-part--description'}>
							<div className={'description--type'}>{type}</div>
							<div className={'description--price'}>{price}</div>
						</div>
					</div>
				</button>
			</div>
		);
	}
}

ItemSearchCard.propTypes = {
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	price: PropTypes.string.isRequired,
	rarity: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	imageSrc: PropTypes.string.isRequired,
	orderedItems: PropTypes.array, //redux,
	addItemToOrder: PropTypes.func, //redux
	removeItemFromOrderByIndex: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items: orderedItems} = state.orderCreator;
	return {orderedItems};
};

const mapDispatchToProps = {addItemToOrder, removeItemFromOrderByIndex};

export default connect(mapStateToProps, mapDispatchToProps)(ItemSearchCard);