import React, {Component} from 'react';

import './styles.scss';

export class Footer extends Component{
	render() {
		return (
			<footer>
				<div className={'footer'}>
					<div className={'footer--row footer--row--fnbr'}>
						<span>Items are delivered by </span>
						<a
							className={'row--fnbr-link'}
							target={'_blank'}
							href={'https://fnbr.co'}
						>
							fnbr.co
						</a>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;