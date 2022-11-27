import React from 'react';

export const InputLabel = ({ className, text, name }) => {
	return (
		<label htmlFor={name} className={`text-sm text-gray-500 ${className}`}>
			{text}
		</label>
	);
};
