import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setConfig} from './modules/config/actions';

import Searching from './modules/searching/components/Searching';
import OrderInformation from './modules/order/components/OrderInfo';
import OrderOpenButton from './modules/order/components/OrderOpenButton';

import './scss/index.scss';

class App extends Component {
	componentDidMount() {
		this.props.setConfig();
	}

	render() {
		return (
			<div>
				<Searching/>
				<OrderInformation/>
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