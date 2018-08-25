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
		const {indexInOrder, existsInOrder} = this.state;
		const {_id, name, rarity} = this.props;

		const item = {
			_id,
			name,
			rarity,
			active: true
		};

		if (existsInOrder) {
			const active = this.checkThatIsActive();
			this.props.setActiveInOrderedItem(indexInOrder, !active);
		}
		else {
			this.props.addItemToOrder(item);
			this.setIndexInOrder(this.props.orderedItems.length);
			this.setExistsInOrder(true);
		}
	}

	checkThatItemIsOrdered() {
		const {_id} = this.props;
		const {orderedItems} = this.props;

		const sameItemInOrder = orderedItems.find((orderedItem) => (_id === orderedItem._id));

		return (sameItemInOrder !== undefined);
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