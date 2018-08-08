import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

class Pagination extends Component {
	render() {
		return (
			<div className={'container-fluid pagination'}>
				<div className={'row'}>
					<div className={'col-6'}>
						<button className={'pagination--button pagination--button--previous'}>
							Previous
						</button>
					</div>
					<div className={'col-6'}>
						<button className={'pagination--button pagination--button--next'}>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default Pagination;