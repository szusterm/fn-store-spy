import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {closeOrderList} from '../../actions';

import OrderList from '../OrderList';
import BlackCurtain from '../../../../components/BlackCurtain';
import HideOrderButton from '../HideOrderButton';
import FullOrderCount from '../FullOrderCount';
import SendOrderButton from '../../../orderConfirming/components/SendOrderButton';

import './styles.scss';

export class OrderInfo extends Component {
	isOrderEmpty() {
		const {items} = this.props;

		const isEmpty = (items.length === 0);

		if (isEmpty) {
			this.props.closeOrderList();
		}

		return isEmpty;
	}

	render() {
		const {listOpened, closeOrderList} = this.props;

		return (
			<div>
				<BlackCurtain
					show={listOpened}
					onClick={closeOrderList}
				/>
				<div className={`order-info ${(!listOpened || this.isOrderEmpty()) && 'order-info--hidden'}`}>
					<div className={'container-fluid order-info--components'}>
						<div className={'row components--button-box'}>
							<div className={'col-8'}>
								<HideOrderButton/>
							</div>
						</div>
						<div className={'row components--list'}>
							<div className={'col-12'}>
								<OrderList/>
							</div>
						</div>
						<div className={'row components--confirmation-box'}>
							<div className={'col-12'}>
								<FullOrderCount/>
							</div>
							<div className={'col-9'}>
								<SendOrderButton/>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

OrderInfo.propTypes = {
	items: PropTypes.array, //redux
	listOpened: PropTypes.bool, //redux
	closeOrderList: PropTypes.func //redux
};

const mapStateToProps = (state) => {
	const {items, listOpened} = state.order;
	return {items, listOpened};
};

const mapDispatchToProps = {closeOrderList};

export default connect(mapStateToProps, mapDispatchToProps)(OrderInfo);