import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useCityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectCity = forwardRef(
	({ containerClassName, error, onChange, showLabel, params, ...props }, ref) => {
		const { cityList, fetchingCityList, getCityList } = useCityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getCityList({ ...params });
			else getCityList();
		}, [params]);

		useEffect(() => {
			if (cityList?.total > 0) {
				const mapCity = cityList.items.map((city) => ({ label: city.name, value: city.id }));
				setOptions(mapCity);
			}
		}, [cityList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Kota" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingCityList}
					onChange={onChange}
					placeholder="Pilih Kota"
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectCity.displayName = 'InputSelectCity';
InputSelectCity.defaultProps = {
	name: 'city',
	params: {},
	containerClassName: '',
	showLabel: true
};
