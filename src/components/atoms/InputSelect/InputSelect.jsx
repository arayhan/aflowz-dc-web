import React, { forwardRef } from 'react';
import ReactSelect from 'react-select';

export const InputSelect = forwardRef(({ options, value, disabled, onChange, ...props }, ref) => {
	return (
		<ReactSelect
			{...props}
			ref={ref}
			value={options.filter(function (option) {
				return option.value === value;
			})}
			onChange={onChange}
			disabled={disabled}
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
