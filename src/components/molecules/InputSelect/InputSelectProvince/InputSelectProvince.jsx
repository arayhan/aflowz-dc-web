import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProvinceStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProvince = forwardRef(({ error, onChange, ...props }, ref) => {
	const { provinceList, fetchingProvinceList, getProvinceList } = useProvinceStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getProvinceList();
	}, []);

	useEffect(() => {
		if (provinceList?.total > 0) {
			const mapProvince = provinceList.items.map((province) => ({
				label: province.name,
				value: province.id
			}));

			setOptions(mapProvince);
		}
	}, [provinceList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Provinsi" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingProvinceList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectProvince.displayName = 'InputSelectProvince';
InputSelectProvince.defaultProps = {
	name: 'province'
};
