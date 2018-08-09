import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {replaceItems} from '../../redux/actions';

import ItemsList from '../ItemsList';
import Pagination from '../Pagination';

import './styles.scss';

class Searching extends Component {
	constructor() {
		super();

		this.state = {
			page: 1
		};

		this.updateItems = this.updateItems.bind(this);
	}

	componentDidMount() {
		this.updateItems();
	}

	updateItems(data = {}) {
		this.updateFilters(data);
		this.props.replaceItems(this.state);
	}

	updateFilters(data = {}) {
		const newState = Object.assign(this.state, data);
		this.setState(newState);
	}

	render() {
		return (
			<div className={'container searching'}>
				<div className={'row searching--items-list-box'}>
					<div className={'col-12 col-sm-12 col-md-11 col-lg-10 col-xl-8'}>
						<ItemsList items={this.props.items.list}/>
					</div>
				</div>
				<div className={'row searching--pagination-box'}>
					<div className={'col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'}>
						<Pagination
							onChange={(page) => this.updateItems({page})}
						/>
					</div>
				</div>
			</div>
		);
	}
}

Searching.propTypes = {
	replaceItems: PropTypes.func, //redux
	items: PropTypes.object //redux
};


const mapStateToProps = (state) => {
	const {items} = state;

	return {items};
};

const mapDispatchToProps = {replaceItems};

export default connect(mapStateToProps, mapDispatchToProps)(Searching);