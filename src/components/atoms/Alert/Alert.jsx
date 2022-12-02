import React from 'react';
import { IoMdAlert, IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Alert = ({ type, message, onClose }) => {
	const typeClasses = classNames({
		'bg-primary-500': type === 'primary',
		'bg-blue-500': type === 'info',
		'bg-green-500': type === 'success',
		'bg-yellow-500': type === 'warning',
		'bg-red-500': type === 'danger'
	});

	return (
		<div className={`text-white rounded-md ${typeClasses}`}>
			<div className="p-3 flex items-center justify-between">
				<div className="text-sm flex items-center space-x-2">
					{type === 'primary' && <IoMdAlert size={20} />}
					<IoMdAlert size={18} />
					<span>Error</span>
				</div>
			</div>
			<hr className="border-red-400" />
			<div className="p-3">
				<span className="text-sm opacity-90">{message}</span>
			</div>
		</div>
	);
};

Alert.propTypes = {
	type: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger'])
};

Alert.defaultProps = {
	onClose: () => {}
};
