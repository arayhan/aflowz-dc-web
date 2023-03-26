import React from 'react';
import ReactSelectAsync from 'react-select/async';

export const InputSelectAsync = ({
	options,
	loadOptions,
	value,
	loading,
	multi,
	searchable,
	clearable,
	disabled,
	onChange,
	placeholder,
	innerRef,
	...props
}) => {
	return (
		<ReactSelectAsync
			{...props}
			cacheOptions
			ref={innerRef}
			value={options.filter(function (option) {
				return option.value === value;
			})}
			defaultOptions
			className={`z-10 ${props.className}`}
			placeholder={placeholder}
			onChange={onChange}
			loadOptions={loadOptions}
			isMulti={multi}
			isSearchable={searchable}
			isLoading={loading}
			isDisabled={disabled}
			isClearable={clearable}
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
		/>
	);
};

InputSelectAsync.displayName = 'InputSelectAsync';
InputSelectAsync.defaultProps = {
	clearable: true
};
