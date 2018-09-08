import React, {Component} from 'react';

import whiteLogoUrl from '../../images/logo-white.png';

import './styles.scss';

export class Logo extends Component {
	render() {
		return (
			<div className={'start-info'}>
				<img src={whiteLogoUrl}/>
			</div>
		);
	}
}

export default Logo;