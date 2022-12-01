import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useDistrictStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectDistrict = forwardRef(({ error, onChange, cityID, ...props }, ref) => {
	const { districtList, fetchingDistrictList, getDistrictList } = useDistrictStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		setOptions([]);
		getDistrictList(cityID);
	}, [cityID]);

	useEffect(() => {
		if (districtList?.total > 0) {
			const mapDistrict = districtList.items.map((district) => ({
				label: district.name,
				value: district.id
			}));

			setOptions(mapDistrict);
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
