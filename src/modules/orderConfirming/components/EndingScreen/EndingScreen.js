import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

export class EndingScreen extends Component {
	render() {
		const {endingScreenOpened} = this.props;

		return (
			<div className={`ending-screen ${(!endingScreenOpened) && 'ending-screen--hidden'}`}>

			</div>
		);
	}
}

EndingScreen.propTypes = {
	endingScreenOpened: PropTypes.bool //redux
};

const mapStateToProps = (state) => {
	const {endingScreenOpened} = state.orderConfirming;

	return {endingScreenOpened};
};

export default connect(mapStateToProps, null)(EndingScreen);