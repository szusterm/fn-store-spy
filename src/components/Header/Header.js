import React, {Component} from 'react';

import MessengerLink from '../MessengerLink';

import './styles.scss';

export class Header extends Component {
	render() {
		return (
			<header>
				<div className={'header'}>
					<div className={'header--site-info'}>
						<img
							className={'site-info--logo'}
							src={'../images/logo.svg'}
						/>
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