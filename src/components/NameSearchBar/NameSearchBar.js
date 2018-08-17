import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setNameFilter} from '../../redux/actions';

import './styles.scss';

export class NameSearchBar extends Component {
	constructor() {
		super();

		this.state = {
			name: ''
		};

		this.updateStore = this.updateStore.bind(this);
	}

	updateLocalName(name) {
		const newState = {
			...this.state,
			name
		};

		this.setState(newState);
	}

	updateStore(event) {
		const {value: name} = event.target;

		this.updateLocalName(name);

		if (name.length >= 3) {
			this.props.setNameFilter(name);
			this.props.onChange(name);
		}
	}

	render() {
		return (
			<div className={'name-search-bar'}>
				<input
					className={'name-search-bar--input'}
					placeholder={'Search by name'}
					value={this.state.name}
					onChange={this.updateStore}
				/>
			</div>
		);
	}
}

NameSearchBar.propTypes = {
	onChange: PropTypes.func,
	name: PropTypes.string, //redux
	setNameFilter: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {name} = state.searching.filters;
	return {name};
};

const mapDispatchToProps = {setNameFilter};

export default connect(mapStateToProps, mapDispatchToProps)(NameSearchBar);