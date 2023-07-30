import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useCityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectCity = forwardRef(
	({ containerClassName, error, onChange, label, showLabel, params, multiple, ...props }, ref) => {
		const { fetchingCityList, getCityList } = useCityStore();

		const [options, setOptions] = useState([]);

		const handleSetOptions = async () => {
			const response = params ? await getCityList({ ...params }) : await getCityList();
			const options = response.payload?.items?.map((city) => ({ label: city.name, value: city.id }));
			setOptions(options);
		};

		useEffect(() => {
			handleSetOptions();
		}, [params]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label} name={props.name} />}
				<InputSelect
					ref={ref}
					multi={multiple}
					options={options}
					loading={fetchingCityList}
					onChange={onChange}
					placeholder={label}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectCity.displayName = 'InputSelectCity';
InputSelectCity.defaultProps = {
	multiple: false,
	name: 'city',
	params: {},
	label: 'Pilih Kota',
	containerClassName: '',
	showLabel: true
};
