import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useCityStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectCity = forwardRef(
	({ error, onChange, provinceID, feature, isForm, provinceQuery, ...props }, ref) => {
		const { cityList, fetchingCityList, getCityList } = useCityStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (isForm) {
				if (provinceQuery.province_id === 0) {
					setOptions([]);
				} else {
					getCityList(provinceQuery);
				}
			} else {
				getCityList({ province_id: provinceID });
			}
		}, [provinceID, provinceQuery]);

		useEffect(() => {
			if (isForm && provinceQuery.province_id === 0) {
				setOptions([]);
			} else {
				if (cityList?.total > 0) {
					const mapCity = cityList.items.map((city) => ({
						label: city.name,
						value: city.id
					}));

					setOptions(mapCity);
				}
			}
		}, [cityList, provinceQuery, isForm]);

		return (
			<div className="space-y-1">
				<InputLabel text={feature ? `Pilih ${feature}` : 'Pilih Kota'} name={props.name} />
				<InputSelect ref={ref} options={options} loading={fetchingCityList} onChange={onChange} {...props} />
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectCity.displayName = 'InputSelectCity';
InputSelectCity.defaultProps = {
	name: 'city'
};
