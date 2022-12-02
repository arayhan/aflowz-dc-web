import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectVillage = forwardRef(({ error, onChange, cityID, districtQuery, isForm, ...props }, ref) => {
	const { villageList, fetchingVillageList, getVillageList } = useVillageStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		if (isForm) {
			if (districtQuery.district_id === 0) {
				setOptions([]);
			} else {
				getVillageList(districtQuery);
			}
		} else {
			getVillageList({ city_id: cityID });
		}
	}, [cityID, districtQuery, isForm]);

	useEffect(() => {
		if (isForm && (villageList?.total === 0 || districtQuery.district_id === 0)) {
			setOptions([]);
		} else {
			if (villageList?.total > 0) {
				const mapVillage = villageList.items.map((village) => ({
					label: village.name,
					value: village.id
				}));

				setOptions(mapVillage);
			}
		}
	}, [villageList, districtQuery]);

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
	name: 'village'
};
