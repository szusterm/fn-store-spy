import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {setConfig} from './modules/config/actions';

import Header from './components/Header';
import Searching from './modules/itemsSearching/components/Searching';
import OrderInformation from './modules/orderCreator/components/OrderInfo';
import OrderOpenButton from './modules/orderCreator/components/OrderOpenButton';
import EndingScreen from './modules/orderConfirming/components/EndingScreen';
import Footer from './components/Footer/Footer';

import './scss/app.scss';

class App extends Component {
	componentDidMount() {
		this.props.setConfig();
	}

	render() {
		return (
			<div>
				<Header/>
				<Searching/>
				<OrderInformation/>
				<OrderOpenButton/>
				<EndingScreen/>
				<Footer/>
			</div>
		);
	}
}

App.propTypes = {
	setConfig: PropTypes.func //redux
};

const mapDispatchToProps = {setConfig};

export default connect(null, mapDispatchToProps)(App);