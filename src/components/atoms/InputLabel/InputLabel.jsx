import React from 'react';

export const InputLabel = ({ className, text, name, helper }) => {
	return (
		<label htmlFor={name} className={`text-sm text-gray-500 ${className}`}>
			{text} {helper && <span className="text-xs italic text-gray-400">{helper}</span>}
		</label>
	);
};
