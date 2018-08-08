import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {replaceItems} from '../../redux/actions';

import ItemsList from '../ItemsList';
import Pagination from '../Pagination';

import './styles.scss';

class Searching extends Component {
	componentDidMount() {
		this.props.replaceItems({page: 1});
	}

	render() {
		return (
			<div className={'container searching'}>
				<div className={'row searching--items-list-box'}>
					<div className={'col-10'}>
						<ItemsList items={this.props.items}/>
					</div>
				</div>
				<div className={'row searching--pagination-box'}>
					<div className={'col-4'}>
						<Pagination/>
					</div>
				</div>
			</div>
		);
	}
}

Searching.propTypes = {
	replaceItems: PropTypes.func, //redux
	items: PropTypes.array //redux
};


const mapStateToProps = (state) => {
	const {items} = state;

	return {items};
};

const mapDispatchToProps = {replaceItems};

export default connect(mapStateToProps, mapDispatchToProps)(Searching);