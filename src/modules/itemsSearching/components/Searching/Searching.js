import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {updateItems, setPageFilter} from '../../actions';

import NameSearchBar from '../NameSearchBar';
import ItemsList from '../ItemsList';
import Pagination from '../Pagination';

import './styles.scss';

export class Searching extends Component {
	constructor() {
		super();

		this.updateItemsWithPageReset = this.updateItemsWithPageReset.bind(this);
	}

	componentDidMount() {
		this.updateItemsWithPageReset();
	}

	updateItemsWithPageReset() {
		this.resetPage();
		this.props.updateItems();
	}

	resetPage() {
		this.props.setPageFilter(1);
	}

	render() {
		const {items, updateItems} = this.props;

		return (
			<div className={'container searching'}>
				<div className={'row searching--name-search-bar-box'}>
					<NameSearchBar onChange={this.updateItemsWithPageReset}/>
				</div>
				<div className={'row searching--items-list-box'}>
					<ItemsList items={items}/>
				</div>
				<div className={'row searching--pagination-box'}>
					<div className={'col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'}>
						<Pagination onChange={updateItems}/>
					</div>
				</div>
			</div>
		);
	}
}

Searching.propTypes = {
	updateItems: PropTypes.func, //redux
	setPageFilter: PropTypes.func, //redux
	items: PropTypes.array //redux
};


const mapStateToProps = (state) => {
	const {items} = state.itemsSearching;
	return {items};
};

const mapDispatchToProps = {updateItems, setPageFilter};

export default connect(mapStateToProps, mapDispatchToProps)(Searching);