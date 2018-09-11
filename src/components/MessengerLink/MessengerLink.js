import React, {Component} from 'react';

import './styles.scss';

export class MessengerLink extends Component {
	render() {
		return (
			<a
				className={'messenger-link'}
				href={'#'}
			>
				<div className={'messenger-link--button'}>
					Go to Messenger
				</div>
			</a>
		);
	}
}

export default MessengerLink;