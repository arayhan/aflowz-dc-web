import React, { forwardRef } from 'react';
import ReactSelect from 'react-select';

export const InputSelect = forwardRef(
	({ options, value, loading, multi, searchable, disabled, onChange, placeholder, ...props }, ref) => {
		return (
			<ReactSelect
				{...props}
				ref={ref}
				value={options.filter(function (option) {
					return option.value === value;
				})}
				className={`z-10 ${props.className}`}
				placeholder={placeholder}
				onChange={onChange}
				isMulti={multi}
				isSearchable={searchable}
				isLoading={loading}
				isDisabled={disabled}
				isClearable
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
	}
);

InputSelect.displayName = 'InputSelect';
