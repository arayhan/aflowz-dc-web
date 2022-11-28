import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useCityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectCity = forwardRef(({ error, onChange, provinceID, feature, ...props }, ref) => {
	const { cityList, fetchingCityList, getCityList } = useCityStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getCityList(provinceID);
	}, [provinceID]);

	useEffect(() => {
		if (cityList?.total > 0) {
			const mapCity = cityList.items.map((city) => ({
				label: city.name,
				value: city.id
			}));

			setOptions(mapCity);
		}
	}, [cityList]);

	return (
		<div className="space-y-1">
			<InputLabel text={feature ? `Pilih ${feature}` : 'Pilih Kota'} name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingCityList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectCity.displayName = 'InputSelectCity';
InputSelectCity.defaultProps = {
	name: 'city'
};
