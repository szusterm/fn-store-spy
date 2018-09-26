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
							className={'row--link row--link--fnbr'}
							target={'_blank'}
							href={'https://fnbr.co'}
						>
							fnbr.co
						</a>
					</div>
					<div className={'footer--row'}>
						<a
							className={'row--link row--link--privacy'}
							href={'/privacy'}
						>
							Privacy Policy
						</a>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;