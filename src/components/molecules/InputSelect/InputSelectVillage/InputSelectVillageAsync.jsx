import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectVillageAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, value, ...props }, ref) => {
		const { village, villageList, fetchingVillageList } = useVillageStore();
		const { getVillageList, getVillage, clearVillageList, clearVillage } = useVillageStore();

		const [options, setOptions] = useState([]);

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getVillageList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

			console.log({ payload });

			const mapVillage = success
				? payload.items.map((village) => ({
						label: village.name,
						value: village.id
				  }))
				: [];

			return {
				options: mapVillage,
				hasMore: prevOptions.length + mapVillage.length < payload.total
			};
		};

		useEffect(() => {
			if (villageList?.total > 0) {
				const mapVillage = villageList.items.map((village) => ({
					label: village.name,
					value: village.id
				}));
				const newOptions = options.filter((option) => !mapVillage.find((village) => village.value === option.value));
				setOptions([...mapVillage, ...newOptions]);
			} else if (value && !villageList && !village) {
				getVillage(value);
			} else if (value && village) {
				setOptions([{ label: village.name, value: village.id }]);
			}
		}, [value, villageList, village]);

		useEffect(() => {
			return () => {
				clearVillageList();
				clearVillage();
				setOptions([]);
			};
		}, []);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih Village'} name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					loading={fetchingVillageList}
					placeholder={placeholder || 'Pilih Village'}
					value={value}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectVillageAsync.displayName = 'InputSelectVillageAsync';
InputSelectVillageAsync.defaultProps = {
	name: 'village',
	containerClassName: '',
	showLabel: true
};
