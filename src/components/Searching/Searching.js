import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {replaceItems} from '../../redux/actions';

import ItemsList from '../ItemsList';

import './styles.scss';

class Searching extends Component {
	componentDidMount() {
		this.props.replaceItems({page: 1});
	}

	render() {
		return (
			<div className={'container'}>
				<div className={'row'}>
					<ItemsList items={this.props.items}/>
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