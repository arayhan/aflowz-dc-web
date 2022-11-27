import React from 'react';

export const InputLabel = ({ text, name }) => {
	return (
		<label htmlFor={name} className="text-sm text-gray-500">
			{text}
		</label>
	);
};
