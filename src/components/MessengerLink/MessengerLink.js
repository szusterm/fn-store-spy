import React, {Component} from 'react';

import './styles.scss';

export class MessengerLink extends Component {
	render() {
		return (
			<a className={'messenger-link'} href={'#'}>
				m.me/ssbot
			</a>
		);
	}
}

export default MessengerLink;