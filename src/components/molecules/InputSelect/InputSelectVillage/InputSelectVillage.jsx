import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectVillage = forwardRef(({ error, onChange, params, ...props }, ref) => {
	const { villageList, fetchingVillageList, getVillageList } = useVillageStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (params) getVillageList({ ...params });
	}, [params]);

	useEffect(() => {
		if (villageList?.total > 0) {
			const villageMap = villageList.items.map((village) => ({ label: village.name, value: village.id }));
			setOptions(villageMap);
		}
	}, [villageList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Kelurahan/Desa" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingVillageList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectVillage.displayName = 'InputSelectVillage';
InputSelectVillage.defaultProps = {
	name: 'village',
	params: {}
};
