import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class NameSearchBar extends Component {
	render() {
		return (
			<input className={'name-search-bar'}/>
		);
	}
}

export default NameSearchBar