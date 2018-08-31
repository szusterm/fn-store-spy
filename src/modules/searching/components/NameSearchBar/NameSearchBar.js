import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setNameFilter} from '../../../../redux/actions';

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
		this.props.onChange();
	}

	render() {
		const {maxNameFilterLength} = this.props;

		return (
			<div className={'name-search-bar'}>
				<input
					className={'name-search-bar--input'}
					placeholder={'Search by name'}
					maxLength={maxNameFilterLength}
					onChange={this.updateStore}
				/>
			</div>
		);
	}
}

NameSearchBar.propTypes = {
	onChange: PropTypes.func,
	maxNameFilterLength: PropTypes.number, //redux
	minNameFilterLength: PropTypes.number, //redux
	name: PropTypes.string, //redux
	setNameFilter: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {name} = state.searching.filters;
	const {minNameFilterLength, maxNameFilterLength} = state.config;

	return {
		name,
		minNameFilterLength,
		maxNameFilterLength
	};
};

const mapDispatchToProps = {setNameFilter};

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);