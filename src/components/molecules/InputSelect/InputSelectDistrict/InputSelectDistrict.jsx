import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useDistrictStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectDistrict = forwardRef(
	({ containerClassName, error, onChange, showLabel, params, ...props }, ref) => {
		const { districtList, fetchingDistrictList, getDistrictList } = useDistrictStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getDistrictList({ ...params });
			if (params === null) setOptions([]);
		}, [params]);

		useEffect(() => {
			if (districtList?.total >= 0) {
				const mapDistrict = districtList.items.map((city) => ({ label: city.name, value: city.id }));
				setOptions(mapDistrict);
			}
		}, [districtList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Kecamatan" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingDistrictList}
					onChange={onChange}
					placeholder="Pilih Kecamatan"
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectDistrict.displayName = 'InputSelectDistrict';
InputSelectDistrict.defaultProps = {
	name: 'district',
	params: {},
	containerClassName: '',
	showLabel: true
};
