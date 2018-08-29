import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class CircleOrderCount extends Component {
	render() {
		const {items} = this.props;

		return (
			<div className={'circle-order-count'}>
				<span className={'circle-order-count--number'}>
					{(items.length < 9) ? items.length : '9+'}
				</span>
			</div>
		);
	}
}

CircleOrderCount.propTypes = {
	items: PropTypes.array //redux
}

const mapStateToProps = (state) => {
	const {items} = state.order;
	return {items};
};

export default connect(mapStateToProps, null)(CircleOrderCount);