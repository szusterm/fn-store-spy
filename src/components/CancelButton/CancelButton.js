import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

export class CancelButton extends Component {
	render() {
		const {onClick} = this.props;

		return (
			<button
				className={'cancel-button'}
				onClick={onClick}
				aria-label={'Cancel'}
			>
				<span className={'material-icons'}>close</span>
			</button>
		);
	}
}

CancelButton.propTypes = {
	onClick: PropTypes.func //redux
};

export default CancelButton;