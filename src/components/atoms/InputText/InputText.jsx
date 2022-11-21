import React from 'react';

export const InputText = ({ label, name, placeholder, ...props }) => {
	return (
		<div className="space-y-1 flex flex-col justify-between">
			<label className="text-sm text-gray-600" htmlFor={name}>
				{label}
			</label>
			<input
				{...props}
				className="border border-gray-300 rounded-[4px] px-3 py-[6px] focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
				placeholder={placeholder}
				id={name}
				name={name}
			/>
		</div>
	);
};
