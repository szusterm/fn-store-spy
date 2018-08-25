import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addItemToOrder, setActiveInOrderedItem} from '../../redux/actions';

import './styles.scss';

export class ItemCard extends Component {
	constructor() {
		super();

		this.state = {
			existsInOrder: false,
			indexInOrder: null
		};

		this.switchOrder = this.switchOrder.bind(this);
	}

	componentDidMount() {
		this.checkThatExistsInOrder();
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

	checkThatExistsInOrder() {
		const {_id} = this.props;

		this.props.orderedItems.find((orderedItem, orderedItemIndex) => {

			const exists = (_id === orderedItem._id);

			if (exists) {
				this.setIndexInOrder(orderedItemIndex);
				this.setExistsInOrder(exists);
			}

			return exists;
		});
	}

	checkThatIsActive() {
		const {indexInOrder, existsInOrder} = this.state;

		if (existsInOrder) {
			const {active} = this.props.orderedItems[indexInOrder];

			return active;
		}

		return false;
	}

	setExistsInOrder(existsInOrder) {
		const newState = Object.assign(this.state, {
			existsInOrder
		});

		this.setState(newState);
	}

	setIndexInOrder(indexInOrder) {
		const newState = Object.assign(this.state, {
			indexInOrder
		});

		this.setState(newState);
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