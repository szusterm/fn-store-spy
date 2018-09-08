import React, {Component} from 'react';

import './styles.scss';

export class StartInfo extends Component {
	render() {
		return (
			<header>
				<div className={'container'}>
					<div className={'row'}>
						<h1>Choose items to receive notifications through Messenger</h1>
					</div>
				</div>
			</header>
		);
	}
}

export default StartInfo;