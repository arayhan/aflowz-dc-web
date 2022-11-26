import { usePartnerStore } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

export const InputSelectStaff = ({ selectedStaff, setPlaceholder }) => {
    const { staffList, getStaffList } = usePartnerStore();

    const [options, setOptions] = useState([]);

    useEffect(() => {
        getStaffList();
    }, []);

    useEffect(() => {
        if (staffList?.total > 0) {
            const mapStaff = staffList.items.map((staff) => ({
                label: staff.name,
                value: staff.id
            }));

            setOptions(mapStaff);
        }
    }, [staffList]);

    return (
        <div className="space-y-1">
			<label className="text-sm text-gray-600" htmlFor="staff">
				Pilih Staff
			</label>
			<ReactSelect
				styles={{
					input: (provided) => ({
						...provided,
						'input:focus': {
							boxShadow: 'none'
						}
					})
				}}
				id="staff"
				name="staff"
				options={options}
                onChange={(selectedOption) => selectedStaff(selectedOption.value)}
                placeholder={setPlaceholder}
			/>
		</div>
    );
};