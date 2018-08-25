import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addItemToOrder, removeItemFromOrderByIndex} from '../../redux/actions';

import './styles.scss';

export class ItemCard extends Component {
	constructor() {
		super();

		this.switchOrder = this.switchOrder.bind(this);
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

	render() {
		const {name, price, rarity, type, imageSrc} = this.props;

		return (
			<div
				className={'item-card item-card--raised'}
				onClick={this.switchOrder}
			>
				<div className={'item-card--top-part'}>
					<div className={`top-part--img-box top-part--img-box--${rarity}`}>
						<img
							className={'img-box--image'}
							src={imageSrc}
						/>
					</div>
				</div>
				<div className={'item-card--bot-part'}>
					<div className={'bot-part--name'}>{name}</div>
					{
						(this.getIndexInOrder() !== null) &&
							<span>ORDERED</span>
					}
					<div className={'bot-part--description'}>
						<div className={'description--type'}>{type}</div>
						<div className={'description--price'}>{price}</div>
					</div>
				</div>
			</div>
		);
	}
}

ItemCard.propTypes = {
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
	const {items: orderedItems} = state.order;
	return {orderedItems};
};

const mapDispatchToProps = {addItemToOrder, removeItemFromOrderByIndex};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);