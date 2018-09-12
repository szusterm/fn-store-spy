import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {closeOrderList} from '../../actions';

import './styles.scss';

export class CancelButton extends Component {
	render() {
		const {closeOrderList} = this.props;

		return (
			<div className={'col-8'}>
				<button
					className={'cancel-button'}
					onClick={closeOrderList}
				>
					<span className={'material-icons'}>close</span>
				</button>
			</div>
		);
	}
}

CancelButton.propTypes = {
	closeOrderList: PropTypes.func //redux
};

const mapDispatchToProps = {closeOrderList};

export default connect(null, mapDispatchToProps)(CancelButton);