import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateItems} from '../../redux/actions';

import NameSearchBar from '../NameSearchBar';
import ItemsList from '../ItemsList';
import Pagination from '../Pagination';

import './styles.scss';

export class Searching extends Component {
	componentDidMount() {
		this.props.updateItems();
	}

	render() {
		return (
			<div className={'container searching'}>
				<div className={'row searching--name-search-bar-box'}>
					<div className={'col-12 col-sm-12 col-md-10 col-lg-9 col-xl-8'}>
						<NameSearchBar/>
					</div>
				</div>
				<div className={'row searching--items-list-box'}>
					<div className={'col-12 col-sm-12 col-md-11 col-lg-10 col-xl-8'}>
						<ItemsList items={this.props.searching.items}/>
					</div>
				</div>
				<div className={'row searching--pagination-box'}>
					<div className={'col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4'}>
						<Pagination
							onChange={this.props.updateItems}
						/>
					</div>
				</div>
			</div>
		);
	}
}

Searching.propTypes = {
	updateItems: PropTypes.func, //redux
	searching: PropTypes.object //redux
};


const mapStateToProps = (state) => {
	const {searching} = state;
	return {searching};
};

const mapDispatchToProps = {updateItems};

export default connect(mapStateToProps, mapDispatchToProps)(Searching);