import React, {Component} from 'react';

import Logo from '../Logo';

import './styles.scss';

export class StartInfo extends Component {
	render() {
		return (
			<header>
				<div className={'start-info'}>
					<div className={'start-info--logo-box'}>
						<Logo color={'white'}/>
					</div>
					<h1 className={'start-info--text'}>
						<span className={'start-info--text--bold'}>Hello. </span>
						Welcome to StoreSpy.<br/>
						Messenger shop notifier.
					</h1>
				</div>
			</header>
		);
	}
}

export default StartInfo;