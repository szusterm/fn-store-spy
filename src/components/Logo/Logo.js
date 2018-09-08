import React, {Component} from 'react';
import PropTypes from 'prop-types';

import whiteLogoUrl from '../../images/logo-white.png';
import blackLogoUrl from '../../images/logo-black.png';

import './styles.scss';

export class Logo extends Component {
	render() {
		const {color} = this.props;

		return (
			<div className={'start-info'}>
				<img
					className={'start-info--image'}
					src={(color === 'white') ? whiteLogoUrl : blackLogoUrl}
				/>
			</div>
		);
	}
}

Logo.propTypes = {
	color: PropTypes.string.isRequired
};

export default Logo;