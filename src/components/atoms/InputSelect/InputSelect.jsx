import React, { forwardRef } from 'react';
import ReactSelect from 'react-select';

export const InputSelect = forwardRef(({ options, onChange, ...props }, ref) => {
	return (
		<ReactSelect
			{...props}
			ref={ref}
			onChange={onChange}
			styles={{
				input: (provided) => ({
					...provided,
					'input:focus': {
						boxShadow: 'none'
					}
				})
			}}
			options={options}
		/>
	);
});

InputSelect.displayName = 'InputSelect';
