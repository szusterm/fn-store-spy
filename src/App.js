import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setConfig} from './redux/actions';

import Searching from './components/Searching';
import Order from './components/Order';
import OrderOpenButton from './components/OrderOpenButton';

import './scss/index.scss';

class App extends Component {
	componentDidMount() {
		this.props.setConfig();
	}

	render() {
		return (
			<div>
				<Searching/>
				<Order/>
				<OrderOpenButton/>
			</div>
		);
	}
}

App.propTypes = {
	setConfig: PropTypes.func //redux
};

const mapDispatchToProps = {setConfig};

export default connect(null, mapDispatchToProps)(App);