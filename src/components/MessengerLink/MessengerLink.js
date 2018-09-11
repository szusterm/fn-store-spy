import React, {Component} from 'react';

import './styles.scss';

export class MessengerLink extends Component {
	render() {
		return (
			<div className={'col-3'}>
				<a
					className={'messenger-link'}
					href={'#'}
				>
					<div className={'messenger-link--button'}>
						m.me/ssbot
					</div>
				</a>
			</div>
		);
	}
}

export default MessengerLink;