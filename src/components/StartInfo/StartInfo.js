import React, {Component} from 'react';

import './styles.scss';

export class StartInfo extends Component {
	render() {
		return (
			<header className={'start-info'}>
				<div className={'container'}>
					<div className={'row start-info--description'}>
						<h1 className={'description--text'}>
							<span className={'description--text--bold'}>Hello. </span>
							Welcome to StoreSpy.<br/>
							Messenger shop notifier.
						</h1>
					</div>
				</div>
			</header>
		);
	}
}

export default StartInfo;