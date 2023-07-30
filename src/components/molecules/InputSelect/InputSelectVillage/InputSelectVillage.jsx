import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useVillageStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectVillage = forwardRef(
	({ containerClassName, error, onChange, showLabel, label, multiple, params, ...props }, ref) => {
		const { fetchingVillageList, getVillageList } = useVillageStore();

		const [options, setOptions] = useState([]);

		const handleSetOptions = async () => {
			const response = params ? await getVillageList({ ...params }) : await getVillageList();
			const options = response.payload?.items?.map((village) => ({ label: village.name, value: village.id }));
			setOptions(options);
		};

		useEffect(() => {
			handleSetOptions();
		}, [params]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label} name={props.name} />}
				<InputSelect
					ref={ref}
					multi={multiple}
					options={options}
					loading={fetchingVillageList}
					placeholder={label}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectVillage.displayName = 'InputSelectVillage';
InputSelectVillage.defaultProps = {
	name: 'village',
	multiple: false,
	label: 'Pilih Kelurahan/Desa',
	params: {},
	containerClassName: '',
	showLabel: true
};
