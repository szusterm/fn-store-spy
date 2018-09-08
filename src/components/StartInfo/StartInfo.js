import React, {Component} from 'react';

import Logo from '../Logo';

import './styles.scss';

export class StartInfo extends Component {
	render() {
		return (
			<header className={'start-info'}>
				<div className={'start-info--description'}>
					<Logo color={'white'}/>
					<h1 className={'description--text'}>
						<span className={'description--text--bold'}>Hello. </span>
						Welcome to StoreSpy.<br/>
						Messenger shop notifier.
					</h1>
				</div>
			</header>
		);
	}
}

export default StartInfo;