import React, {Component} from 'react';
import PropTypes from 'prop-types';

import ItemsList from '../ItemsList';

import './styles.scss';

class Searching extends Component {
	render() {
		return (
			<div className={'container'}>
				<div className={'row'}>
					<ItemsList/>
				</div>
			</div>
		);
	}
}

export default Searching;