import React, {Component} from 'react';

import MessengerLink from '../MessengerLink';

import Logo from '../Logo';

import './styles.scss';

export class Header extends Component {
	render() {
		return (
			<header>
				<div className={'header'}>
					<div className={'header--site-info'}>
						<div className={'site-info--logo-box'}>
							<Logo/>
						</div>
						<h1 className={'site-info--text'}>
							<span className={'site-info--text--bold'}>Hello. </span>
							Welcome to StoreSpy.<br/>
							Messenger shop notifier.
						</h1>
					</div>
					<MessengerLink reversed/>
				</div>
			</header>
		);
	}
}

export default Header;