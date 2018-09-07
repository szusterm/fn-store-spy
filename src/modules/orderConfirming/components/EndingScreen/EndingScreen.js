import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class EndingScreen extends Component {

}

const mapStateToProps = (state) => {
	const {endingScreenOpened} = state.orderConfirming;

	return {endingScreenOpened};
};

export default connect(mapStateToProps, null)(EndingScreen);