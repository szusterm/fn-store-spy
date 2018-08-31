import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {closeOrderList} from '../../redux/actions';

import './styles.scss';

export class HideOrderButton extends Component {
	render() {
		const {closeOrderList} = this.props;

		return (
			<button
				className={'material-icons hide-order-button'}
				onClick={closeOrderList}
			>
				<span>close</span>
			</button>
		);
	}
}

HideOrderButton.propTypes = {
	closeOrderList: PropTypes.func //redux
};

const mapDispatchToProps = {closeOrderList};

export default connect(null, mapDispatchToProps)(HideOrderButton);