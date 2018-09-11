import React, {Component} from 'react';

import './styles.scss';

export class MessengerLink extends Component {
	render() {
		return (
			<div className={'col-12 col-sm-6 col-md-4 col-lg-3'}>
				<a
					className={'messenger-link'}
					href={'#'}
				>
					<div className={'messenger-link--button'}>
						Go to Messenger
					</div>
				</a>
			</div>
		);
	}
}

export default MessengerLink;