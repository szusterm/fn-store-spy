import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class MessengerLink extends Component {
	render() {
		const {reversed} = this.props;

		return (
			<a
				className={'messenger-link'}
				href={'#'}
			>
				<div className={`messenger-link--button ${(reversed) ? 'messenger-link--button--reversed' : ''}`}>
					<svg
						className={'button--svg-icon'}
						xmlns={'http://www.w3.org/2000/svg'}
						role={'img'}
						viewBox={'0 0 213.25417 213.25417'}
					>
						<g transform={'translate(0 -83.746)'}>
							<path
								className={'svg-icon--path'}
								d={'m106.63 83.746a106.63 106.63 0 0 0 -106.63 106.63 106.63 106.63 0 0 0 106.63 106.63 106.63 106.63 0 0 0 106.63 -106.63 106.63 106.63 0 0 0 -106.63 -106.63zm69.466 75.368-58.237 61.795-27.604-28.661-53.092 29.383 58.238-61.796 27.604 28.662z'}
							/>
						</g>
					</svg>
					<span className={'button--title'}>Messenger Bot</span>
				</div>
			</a>
		);
	}
}

MessengerLink.propTypes = {
	reversed: PropTypes.bool
};

export default MessengerLink;