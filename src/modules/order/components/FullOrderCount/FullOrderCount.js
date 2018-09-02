import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class FullOrderCount extends Component {

}

FullOrderCount.propTypes = {
	orderedItems: PropTypes.array, //redux
	maxItemsInOrder: PropTypes.number //redux
};

const mapStateToProps = (state) => {
	const {items} = state.order;
	const {maxItemsInOrder} = state.config;

	return {
		orderedItems: items,
		maxItemsInOrder
	};
};

export default connect(mapStateToProps, null)(FullOrderCount);