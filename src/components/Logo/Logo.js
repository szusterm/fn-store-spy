import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class Logo extends Component {
	constructor() {
		super();

		this.state = {
			url: {
				white: '../images/logo-white.png',
				dark: '../images/logo-black.png'
			}
		};
	}

	render() {
		const {url} = this.state;
		const {dark} = this.props;

		return (
			<div className={'logo'}>
				<img
					className={'logo--image'}
					src={(!dark) ? url.white : url.dark}
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