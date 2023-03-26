import React from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';

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
	console.log({ options, value });
	return (
		<AsyncPaginate
			{...props}
			ref={innerRef}
			value={options.filter(function (option) {
				return option.value === value;
			})}
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
