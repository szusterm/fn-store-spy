import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setPageFilter} from '../../actions';

import './styles.scss';

export class Pagination extends Component {
	constructor() {
		super();

		this.setPreviousPage = this.setPreviousPage.bind(this);
		this.setNextPage = this.setNextPage.bind(this);
	}

	setNextPage() {
		const {page} = this.props;
		const newPage = page + 1;
		this.props.setPageFilter(newPage);

		this.props.onChange();
	}

	setPreviousPage() {
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
			<div className={'col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'}>
				<div className={'container-fluid pagination'}>
					<div className={'row'}>
						<div className={'col-6'}>
							<button
								className={'pagination--button pagination--button--previous'}
								disabled={(page <= 1)}
								onClick={this.setPreviousPage}
							>
								Previous
							</button>
						</div>
						<div className={'col-6'}>
							<button
								className={'pagination--button pagination--button--next'}
								disabled={!nextPageAvailable}
								onClick={this.setNextPage}
							>
								Next
							</button>
						</div>
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
	const {nextPageAvailable} = state.itemsSearching;
	const {page} = state.itemsSearching.filters;

	return {nextPageAvailable, page};
};

const mapDispatchToProps = {setPageFilter};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);