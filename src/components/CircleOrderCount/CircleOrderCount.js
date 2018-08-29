import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export class CircleOrderCount extends Component {

}

const mapStateToProps = (state) => {
	const {items} = state.order;
	return {items};
};

export default connect(mapStateToProps, null)(CircleOrderCount);