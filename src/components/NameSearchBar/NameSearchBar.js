import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setNameFilter} from '../../redux/actions';

import './styles.scss';

export class NameSearchBar extends Component {
	constructor() {
		super();

		this.updateStore = this.updateStore.bind(this);
	}

	updateStore(event) {
		const {value: name} = event.target;
		const {minNameFilterLength} = this.props;

		const nameToSave = (name.length >= minNameFilterLength) ? name : '';
		this.props.setNameFilter(nameToSave);
		this.props.onChange(nameToSave);
	}

	render() {
		return (
			<div className={'name-search-bar'}>
				<input
					className={'name-search-bar--input'}
					placeholder={'Search by name'}
					onChange={this.updateStore}
				/>
			</div>
		);
	}
}

NameSearchBar.propTypes = {
	onChange: PropTypes.func,
	minNameFilterLength: PropTypes.number, //redux
	name: PropTypes.string, //redux
	setNameFilter: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {name} = state.searching.filters;
	const {minNameFilterLength} = state.config;
	return {name, minNameFilterLength};
};

const mapDispatchToProps = {setNameFilter};

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);