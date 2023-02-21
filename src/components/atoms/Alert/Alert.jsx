import React from 'react';
import { IoMdAlert, IoMdClose } from 'react-icons/io';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Alert = ({ type, message, onClose }) => {
	const typeClassesBackground = classNames({
		'bg-primary-500': type === 'primary',
		'bg-blue-500': type === 'info',
		'bg-green-500': type === 'success',
		'bg-yellow-500': type === 'warning',
		'bg-red-500': type === 'danger'
	});

	const typeClassesBorder = classNames({
		'border-primary-400': type === 'primary',
		'border-blue-400': type === 'info',
		'border-green-400': type === 'success',
		'border-yellow-400': type === 'warning',
		'border-red-400': type === 'danger'
	});

	return (
		<div className={`text-white rounded-md ${typeClassesBackground}`}>
			<div className="flex items-center justify-between p-3">
				<div className="flex items-center space-x-2 text-sm">
					{type === 'primary' && <IoMdAlert size={20} />}
					<IoMdAlert size={18} />
					<span>Error</span>
				</div>
			</div>
			<hr className={typeClassesBorder} />
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
