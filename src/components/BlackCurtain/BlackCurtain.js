import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class BlackCurtain extends Component {
	render() {
		const {show, onClick} = this.props;

		return (
			<div
				className={`black-curtain ${(show) && 'black-curtain--showed'}`}
				onClick={onClick}
			/>
		);
	}
}

BlackCurtain.propTypes = {
	show: PropTypes.bool.isRequired,
	onClick: PropTypes.func
};

export default BlackCurtain;