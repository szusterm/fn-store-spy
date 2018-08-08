import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Pagination extends Component {
	render() {
		return (
			<div className={'pagination'}>
				<button className={'pagination--button pagination--button--previous'}>
					Previous
				</button>
				<button className={'pagination--button pagination--button--next'}>
					Next
				</button>
			</div>
		);
	}
}

export default Pagination;