import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class EndingScreen extends Component {

}

const mapStateToProps = (state) => {
	const {confirmationOpened} = state.orderConfirming;

	return {confirmationOpened};
};

export default connect(mapStateToProps, null)(EndingScreen);