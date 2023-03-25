import React from 'react';
import { GrFormClose } from 'react-icons/gr';

export const Badge = ({ title, onClick }) => {
	return (
		<div className="inline-flex items-center overflow-hidden border rounded-md">
			<span className="px-3 py-1">{title}</span>
			<button className="p-3 text-white bg-red-500 hover:bg-red-400" onClick={onClick}>
				<GrFormClose color="white" />
			</button>
		</div>
	);
};
