import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {openOrderList} from '../../redux/actions';

import './styles.scss';

export class OrderOpenButton extends Component {
	render() {
		return (
			<div
				className={'order-open-button'}
				onClick={this.props.openOrderList}
			>
				<div className={'material-icons'}>
					<span className={'order-open-button--icon'}>shopping_basket</span>
				</div>
			</div>
		);
	}
}

OrderOpenButton.propTypes = {
	openOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {listOpened} = state.order;
	return {listOpened};
};

const mapDispatchToProps = {openOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderOpenButton);