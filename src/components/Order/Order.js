import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class Order extends Component {
	render() {
		return (
			<div className={'order'}>
				<div className={'order--list'}>
					{
						this.props.items.map((item) => {
							const {_id, name, active} = item;

							if (active) {
								return <div key={_id}>{name}</div>;
							}
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