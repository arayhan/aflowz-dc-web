import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useDistrictStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectPICDistrict = forwardRef(
	({ containerClassName, error, multiple, onChange, label, showLabel, params, ...props }, ref) => {
		const { fetchingDistrictList, getDistrictList } = useDistrictStore();

		const [options, setOptions] = useState([]);

		const handleSetOptions = async () => {
			const response = params ? await getDistrictList({ ...params }) : await getDistrictList();
			const options = response.payload?.items?.map((district) => ({ label: district.name, value: district.id }));
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
					options={options}
					multi={multiple}
					loading={fetchingDistrictList}
					onChange={onChange}
					placeholder={label}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectPICDistrict.displayName = 'InputSelectPICDistrict';
InputSelectPICDistrict.defaultProps = {
	name: 'district',
	label: 'Pilih PIC Kecamatan',
	multiple: false,
	params: {},
	containerClassName: '',
	showLabel: true
};
