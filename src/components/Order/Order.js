import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import ItemCoin from '../ItemCoin';

import './styles.scss';

export class Order extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'order'}>
				<div className={'order--list'}>
					{
						items.map((item) => {
							const {_id, imageSrc, rarity} = item;

							return (
								<ItemCoin
									key={_id}
									_id={_id}
									imageSrc={imageSrc}
									rarity={rarity}
								/>
							);
						})
					}
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