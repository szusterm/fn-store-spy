import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CodeCopier from '../CodeCopier';
import MessengerLink from '../../../../components/MessengerLink';

import './styles.scss';

export class EndingScreen extends Component {
	render() {
		const {endingScreenOpened} = this.props;

		return (
			<div className={`ending-screen ${(!endingScreenOpened) ? 'ending-screen--hidden' : ''}`}>
				<div className={'ending-screen--prompt'}>
					<h2 className={'prompt--text'}>Just send this code to the Messenger Bot</h2>
				</div>
				<div className={'ending-screen--code-copier-box'}>
					<CodeCopier/>
				</div>
				<div className={'ending-screen--buttons'}>
					<MessengerLink/>
				</div>
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