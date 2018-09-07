import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class CircleOrderCount extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'circle-order-count'}>
				<span className={'circle-order-count--number'}>
					{(items.length < 10) ? items.length : '9+'}
				</span>
			</div>
		);
	}
}

CircleOrderCount.propTypes = {
	items: PropTypes.array //redux
};

const mapStateToProps = (state) => {
	const {items} = state.orderCreator;
	return {items};
};

export default connect(mapStateToProps, null)(CircleOrderCount);