import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectStaffAsync = forwardRef(
	(
		{ containerClassName, error, onChange, params, placeholder, showLabel, label, multiple, disabled, value, ...props },
		ref
	) => {
		const { staff, staffList, fetchingStaff, fetchingStaffList } = usePartnerStore();
		const { getStaffList, getStaff, clearStaff } = usePartnerStore();

		const [options, setOptions] = useState([]);

		const IS_LOADING = fetchingStaffList || fetchingStaff;

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getStaffList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

			const mapStaff = success
				? payload.items.map((staff) => ({
						label: `${staff.nik_number} - ${staff.name}`,
						value: staff.id,
						data: staff
				  }))
				: [];

			return {
				options: mapStaff,
				hasMore: prevOptions.length + mapStaff.length < payload.total
			};
		};

		useEffect(() => {
			if (staffList?.total > 0) {
				const mapStaff = staffList.items.map((staff) => ({
					label: `${staff.nik_number} - ${staff.name}`,
					value: staff.id,
					data: staff
				}));
				const newOptions = options.filter((option) => !mapStaff.find((staff) => staff.value === option.value));

				setOptions([...mapStaff, ...newOptions]);
			} else if (staff) {
				console.log(staff.name);
				const selectedStaff = { label: `${staff.nik_number} - ${staff.name}`, value: staff.id, data: staff };
				setOptions([...options, selectedStaff]);
			}
		}, [multiple, staff, staffList]);

		useEffect(() => {
			if (multiple && value?.length > 0) {
				Promise.all(value.map((item) => getStaff(item)));
			} else {
				getStaff(value);
			}
		}, [multiple, value]);

		useEffect(() => {
			getStaffList({ limit: 500 });
		}, []);

		useEffect(() => {
			return () => {
				clearStaff();
				setOptions([]);
			};
		}, []);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih PJ Internal DC'} name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					loading={IS_LOADING}
					disabled={(options.length === 0 && IS_LOADING) || disabled}
					placeholder={placeholder || 'Pilih PJ Internal DC'}
					multi={multiple}
					value={value}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectStaffAsync.displayName = 'InputSelectStaffAsync';
InputSelectStaffAsync.defaultProps = {
	name: 'institusi',
	containerClassName: '',
	showLabel: true,
	multiple: false
};
