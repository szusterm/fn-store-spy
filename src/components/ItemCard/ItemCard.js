import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addItemToOrder, setActiveInOrderedItem} from '../../redux/actions';

import './styles.scss';

export class ItemCard extends Component {
	constructor() {
		super();

		this.switchOrder = this.switchOrder.bind(this);
	}

	switchOrder() {
		const {_id, name, rarity} = this.props;

		if (this.checkThatItemIsOrdered()) {
			const item = {
				_id,
				name,
				rarity
			};

			this.props.addItemToOrder(item);
		}
		else {
			const indexInOrder = this.getIndexInOrder();
			//method to remove item from order
		}
	}

	checkThatItemIsOrdered() {
		const {_id} = this.props;
		const {orderedItems} = this.props;

		const sameItemInOrder = orderedItems.find((orderedItem) => (_id === orderedItem._id));

		return (sameItemInOrder !== undefined);
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
						(this.checkThatItemIsOrdered()) &&
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
	setActiveInOrderedItem: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items: orderedItems} = state.order;
	return {orderedItems};
};

const mapDispatchToProps = {addItemToOrder, setActiveInOrderedItem};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);