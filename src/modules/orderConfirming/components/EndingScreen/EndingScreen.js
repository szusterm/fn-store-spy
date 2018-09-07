import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import CodeCopier from '../CodeCopier';

import './styles.scss';

export class EndingScreen extends Component {
	render() {
		const {endingScreenOpened} = this.props;

		return (
			<div className={`container-fluid ending-screen ${(!endingScreenOpened) && 'ending-screen--hidden'}`}>
				<div className={'row'}>
					<div className={'col-4'}>
						<CodeCopier/>
					</div>
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