import React, { forwardRef } from 'react';
import ReactCreatableSelect from 'react-select/creatable';
import './InputSelect.css';

export const InputSelectCreatable = forwardRef(
	({ options, value, loading, multi, searchable, disabled, onChange, placeholder, ...props }, ref) => {
		return (
			<ReactCreatableSelect
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
							boxShadow: 'none',
							zIndex: 20
						}
					}),
					menu: (styles) => ({ ...styles, zIndex: 30 }),
					menuPortal: (styles) => ({ ...styles, zIndex: 30 })
				}}
				menuPortalTarget={document.body}
				options={options}
			/>
		);
	}
);

InputSelectCreatable.displayName = 'InputSelectCreatable';
