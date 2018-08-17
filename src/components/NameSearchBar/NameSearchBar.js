import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setNameFilter} from '../../redux/actions';

import './styles.scss';

export class NameSearchBar extends Component {
	render() {
		return (
			<div className={'name-search-bar'}>
				<input
					className={'name-search-bar--input'}
					placeholder={'Search by name'}
				/>
			</div>
		);
	}
}

NameSearchBar.propTypes = {
	name: PropTypes.string, //redux
	setNameFilter: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {name} = state.searching.filters;
	return {name};
};

const mapDispatchToProps = {setNameFilter};

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);