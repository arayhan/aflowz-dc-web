import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectStaffTitle = forwardRef(({ showLabel, label, clearable, error, onChange, ...props }, ref) => {
	const { staffTitleList, fetchingStaffTitleList, getStaffTitleList } = usePartnerStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getStaffTitleList();
	}, []);

	useEffect(() => {
		if (staffTitleList?.total > 0) {
			const mapStaffTitle = staffTitleList.items.map((title) => ({
				label: title.name,
				value: title.id
			}));

			setOptions(mapStaffTitle);
		}
	}, [staffTitleList]);

	return (
		<div className="space-y-1">
			{showLabel && <InputLabel text={label || 'Pilih Role'} name={props.name} />}
			<InputSelect
				ref={ref}
				options={options}
				loading={fetchingStaffTitleList}
				clearable={clearable}
				onChange={onChange}
				{...props}
			/>
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectStaffTitle.displayName = 'InputSelectStaffTitle';
InputSelectStaffTitle.defaultProps = {
	showLabel: true,
	name: 'staff_title'
};
