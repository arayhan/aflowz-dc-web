import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectVillage = forwardRef(({ error, onChange, cityID, ...props }, ref) => {
	const { villageList, fetchingVillageList, getVillageList } = useVillageStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getVillageList(cityID);
	}, [cityID]);

	useEffect(() => {
		if (villageList?.total > 0) {
			const mapVillage = villageList.items.map((village) => ({
				label: village.name,
				value: village.id
			}));

			setOptions(mapVillage);
		}
	}, [villageList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Kecamatan" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingVillageList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectVillage.displayName = 'InputSelectVillage';
InputSelectVillage.defaultProps = {
	name: 'village'
};
