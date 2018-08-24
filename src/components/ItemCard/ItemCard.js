import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {addItemToOrder} from '../../redux/actions';

import './styles.scss';

export class ItemCard extends Component {
	constructor() {
		super();

		this.state = {
			existsInOrder: false,
			indexInOrder: null
		};

		this.switchOrder = this.switchOrder.bind(this);
		this.checkThatIsOrdered = this.checkThatIsOrdered.bind(this);
	}

	componentDidMount() {
		this.checkThatExistsInOrder();
	}

	switchOrder() {
		const {indexInOrder} = this.state;
		const {_id, name, rarity} = this.props;

		const item = {
			_id,
			name,
			rarity,
			active: true
		};

		if (!indexInOrder) {
			this.props.addItemToOrder(item);
			this.setExistsInOrder(true);
		}
		else {
			this.setIndexInOrder(null);
			this.setExistsInOrder(false);
		}
	}

	checkThatExistsInOrder() {
		const {_id} = this.props;

		this.props.orderedItems.find((orderedItem, orderedItemIndex) => {
			if (_id === orderedItem._id) {
				this.setIndexInOrder(orderedItemIndex);
				this.setExistsInOrder(true);
				return true;
			}
			else {
				this.setExistsInOrder(false);
				return false;
			}
		});
	}

	setExistsInOrder(existsInOrder) {
		const newState = {
			...this.state,
			existsInOrder
		};

		this.setState(newState);
	}

	setIndexInOrder(index) {
		const newState = {
			...this.state,
			indexInOrder: index
		};

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
						(this.state.existsInOrder) &&
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
};

const mapStateToProps = (state) => {
	const {items: orderedItems} = state.order;
	return {orderedItems};
};

const mapDispatchToProps = {addItemToOrder};

export default connect(mapStateToProps, mapDispatchToProps)(ItemCard);