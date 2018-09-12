import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {hideEndingScreen} from '../../actions';

import CodeCopier from '../CodeCopier';
import BlackCurtain from '../../../../components/BlackCurtain';
import MessengerLink from '../../../../components/MessengerLink';
import CancelButton from '../../../../components/CancelButton';

import './styles.scss';

export class EndingScreen extends Component {
	render() {
		const {endingScreenOpened, hideEndingScreen} = this.props;

		return (
			<div>
				<BlackCurtain
					show={endingScreenOpened}
					onClick={hideEndingScreen}
				/>
				<div className={`ending-screen ${(!endingScreenOpened) ? 'ending-screen--hidden' : ''}`}>
					<div className={'ending-screen--prompt'}>
						<h2 className={'prompt--text'}>Send this code to the bot</h2>
					</div>
					<div className={'ending-screen--code-copier-box'}>
						<CodeCopier/>
					</div>
					<div className={'ending-screen--buttons'}>
						<MessengerLink/>
						<CancelButton onClick={hideEndingScreen}/>
					</div>
				</div>
			</div>
		);
	}
}

EndingScreen.propTypes = {
	endingScreenOpened: PropTypes.bool, //redux
	hideEndingScreen: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {endingScreenOpened} = state.orderConfirming;

	return {endingScreenOpened};
};

const mapDispatchToProps = {hideEndingScreen};

export default connect(mapStateToProps, mapDispatchToProps)(EndingScreen);