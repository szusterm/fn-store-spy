import React, {Component} from 'react';

import Logo from '../Logo';

import './styles.scss';

export class Header extends Component {
	render() {
		return (
			<header>
				<div className={'header'}>
					<div className={'header--logo-box'}>
						<Logo/>
					</div>
					<h1 className={'header--text'}>
						<span className={'header--text--bold'}>Hello. </span>
						Welcome to StoreSpy.<br/>
						Messenger shop notifier.
					</h1>
				</div>
			</header>
		);
	}
}

export default Header;