import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class NameSearchBar extends Component {
	render() {
		return (
			<div className={'name-search-bar'}>
				<input
					className={'name-search-bar--input'}
					placeholder={'Search by name'}
				/>
			</div>
		);
	}
}

export default NameSearchBar