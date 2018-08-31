import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setPageFilter} from '../../../../redux/actions';

import './styles.scss';

export class Pagination extends Component {
	constructor() {
		super();

		this.previousPage = this.previousPage.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}

	nextPage() {
		const {page} = this.props;
		const newPage = page + 1;
		this.props.setPageFilter(newPage);

		this.props.onChange();
	}

	previousPage() {
		const {page} = this.props;

		if (page > 1) {
			const newPage = page - 1;
			this.props.setPageFilter(newPage);
		}

		this.props.onChange();
	}

	render() {
		const {page, nextPageAvailable} = this.props;

		return (
			<div className={'container-fluid pagination'}>
				<div className={'row'}>
					<div className={'col-6'}>
						<button
							className={'pagination--button pagination--button--previous'}
							disabled={(page <= 1)}
							onClick={this.previousPage}
						>
							Previous
						</button>
					</div>
					<div className={'col-6'}>
						<button
							className={'pagination--button pagination--button--next'}
							disabled={!nextPageAvailable}
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
	setPageFilter: PropTypes.func, //redux
	page: PropTypes.number, //redux
	nextPageAvailable: PropTypes.bool //redux
};

const mapStateToProps = (state) => {
	const {nextPageAvailable} = state.searching;
	const {page} = state.searching.filters;

	return {nextPageAvailable, page};
};

const mapDispatchToProps = {setPageFilter};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);