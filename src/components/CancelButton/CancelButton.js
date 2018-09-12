import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class CancelButton extends Component {
	render() {
		const {onClick} = this.props;

		return (
			<div className={'col-8'}>
				<button
					className={'cancel-button'}
					onClick={onClick}
				>
					<span className={'material-icons'}>close</span>
				</button>
			</div>
		);
	}
}

CancelButton.propTypes = {
	onClick: PropTypes.func //redux
};

export default CancelButton;