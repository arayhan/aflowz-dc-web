import React from 'react';
import { IoMdAlert, IoMdClose } from 'react-icons/io';

export const Alert = ({ type, message, onClose }) => {
	return (
		<div className="bg-red-500 text-white rounded-md">
			<div className="p-3 flex items-center justify-between">
				<div className="text-sm flex items-center space-x-2">
					<IoMdAlert size={18} />
					<span>Error</span>
				</div>
			</div>
			<hr className="border-red-400" />
			<div className="px-3 py-2">
				<span className="text-sm opacity-90">{message}</span>
			</div>
		</div>
	);
};

Alert.defaultProps = {
	onClose: () => {}
};
