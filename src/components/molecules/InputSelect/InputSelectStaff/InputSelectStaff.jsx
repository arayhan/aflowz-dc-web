import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectStaff = forwardRef(({ error, onChange, text, params, ...props }, ref) => {
	const { staffList, fetchingStaffList, getStaffList } = usePartnerStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		const defaultParams = { is_staff: true, limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;
		getStaffList(requestParams);
	}, [params]);

	useEffect(() => {
		if (staffList?.total > 0) {
			const mapStaff = staffList.items.map((staff) => ({
				label: `${staff.nik_number} - ${staff.name}`,
				value: staff.id
			}));

			setOptions(mapStaff);
		}
	}, [staffList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih PJ Internal DC" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingStaffList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectStaff.displayName = 'InputSelectStaff';
