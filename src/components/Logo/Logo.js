import React, {Component} from 'react';
import PropTypes from 'prop-types';

import whiteLogoUrl from '../../images/logo-white.png';
import blackLogoUrl from '../../images/logo-black.png';

import './styles.scss';

export class Logo extends Component {
	render() {
		const {dark} = this.props;

		return (
			<div className={'logo'}>
				<img
					className={'logo--image'}
					src={(!dark) ? whiteLogoUrl : blackLogoUrl}
				/>
			</div>
		);
	}
}

Logo.propTypes = {
	dark: PropTypes.bool
};

Logo.defaultProps = {
	dark: false
};

export default Logo;