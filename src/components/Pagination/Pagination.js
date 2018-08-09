import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import './styles.scss';

class Pagination extends Component {
	constructor() {
		super();

		this.state = {
			page: 1
		};

		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	updatePage(newPage = 1) {
		const newState = this.state;
		newState.page = newPage;
		this.setState(newState);

		this.props.onChange(newState.page);
	}

	nextPage() {
		const {page} = this.state;
		const newPage = page + 1;
		this.updatePage(newPage);
	}

	previousPage() {
		const {page} = this.state;

		if (page > 1) {
			const newPage = page - 1;
			this.updatePage(newPage);
		}
	}

	render() {
		return (
			<div className={'container-fluid pagination'}>
				<div className={'row'}>
					<div className={'col-6'}>
						<button
							className={'pagination--button pagination--button--previous'}
							disabled={(this.state.page <= 1)}
							onClick={this.previousPage}
						>
							Previous
						</button>
					</div>
					<div className={'col-6'}>
						<button
							className={'pagination--button pagination--button--next'}
							disabled={!this.props.nextPageAvailable}
							onClick={this.nextPage}
						>
							Next
						</button>
					</div>
				</div>
			</div>
		);
	}
}

Pagination.propTypes = {
	onChange: PropTypes.func,
	nextPageAvailable: PropTypes.bool //redux
};

const mapStateToProps = (state) => {
	const {nextPageAvailable} = state;
	return {nextPageAvailable};
};

export default connect(mapStateToProps, null)(Pagination);