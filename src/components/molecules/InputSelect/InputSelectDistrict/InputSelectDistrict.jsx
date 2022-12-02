import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useDistrictStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectDistrict = forwardRef(({ error, onChange, cityID, cityQuery, isForm, ...props }, ref) => {
	const { districtList, fetchingDistrictList, getDistrictList } = useDistrictStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (isForm) {
			if (cityQuery.city_id === 0) {
				setOptions([]);
			} else {
				getDistrictList(cityQuery);
			}
		} else {
			getDistrictList({ city_id: cityID });
		}
	}, [cityID, cityQuery, isForm]);

	useEffect(() => {
		if (isForm && cityQuery.city_id === 0) {
			setOptions([]);
		} else {
			if (districtList?.total > 0) {
				const mapDistrict = districtList.items.map((district) => ({
					label: district.name,
					value: district.id
				}));

				setOptions(mapDistrict);
			}
		}
	}, [districtList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Kecamatan" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingDistrictList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectDistrict.displayName = 'InputSelectDistrict';
InputSelectDistrict.defaultProps = {
	name: 'district'
};
