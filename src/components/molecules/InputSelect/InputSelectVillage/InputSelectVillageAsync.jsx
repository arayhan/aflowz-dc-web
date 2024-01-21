import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectVillageAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, multiple, value, ...props }, ref) => {
		const { village, villageList, fetchingVillageItem, fetchingVillageList } = useVillageStore();
		const { getVillageList, getVillageItem, clearVillageList, clearVillage } = useVillageStore();

		const [options, setOptions] = useState([]);

		const IS_LOADING = fetchingVillageList || fetchingVillageItem;

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getVillageList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

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
			} else if (village) {
				setOptions([{ label: village.name, value: village.id }]);
			}
		}, [value, villageList, village]);

		useEffect(() => {
			if (villageList?.total > 0) {
				const mapVillage = villageList.items.map((village) => ({
					label: village.name,
					value: village.id,
					data: village
				}));
				const newOptions = options.filter((option) => !mapVillage.find((village) => village.value === option.value));
				setOptions([...mapVillage, ...newOptions]);
			} else if (village) {
				const selectedVillage = { label: village.name, value: village.id, data: village };
				setOptions([...options, selectedVillage]);
			}
		}, [multiple, village, villageList]);

		useEffect(() => {
			if (multiple && value?.length > 0) {
				Promise.all(value.map((item) => getVillageItem(item)));
			} else if (value) {
				getVillageItem(value);
			}
		}, [multiple, value]);

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
					loading={IS_LOADING}
					placeholder={placeholder || 'Pilih Village'}
					value={value}
					multi={multiple}
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
