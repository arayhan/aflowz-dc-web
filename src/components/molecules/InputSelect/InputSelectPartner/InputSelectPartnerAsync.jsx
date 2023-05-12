import { InputError, InputLabel, InputSelectAsync } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useState, forwardRef, useEffect } from 'react';

export const InputSelectPartnerAsync = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, label, ...props }, ref) => {
		const { partnerList, fetchingPartnerList, getPartnerList } = usePartnerStore();

		const [options, setOptions] = useState([]);

		const handleLoadOptions = async (search, prevOptions) => {
			const { success, payload } = await getPartnerList({
				limit: 10,
				offset: prevOptions.length,
				...(search && { keyword: search }),
				...params
			});

			const mapPartner = success
				? payload.items.map((partner) => ({
						label: `${partner.name} - ${
							partner.nik_number
								? partner.nik_number + ' (NIK)'
								: partner.nisn_number
								? partner.nisn_number + ' (NISN)'
								: ''
						}`,
						value: partner.id
				  }))
				: [];

			return {
				options: mapPartner,
				hasMore: prevOptions.length + mapPartner.length < payload.total
			};
		};

		useEffect(() => {
			if (partnerList?.total > 0) {
				const mapPartner = partnerList.items.map((partner) => ({
					label: `${partner.nik_number} - ${partner.name}`,
					value: partner.id
				}));
				const newOptions = options.filter((option) => !mapPartner.find((partner) => partner.value === option.value));
				setOptions([...mapPartner, ...newOptions]);
			}
		}, [partnerList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text={label || 'Pilih Partner'} name={props.name} />}
				<InputSelectAsync
					innerRef={ref}
					options={options}
					loadOptions={handleLoadOptions}
					onChange={onChange}
					loading={fetchingPartnerList}
					placeholder={placeholder || 'Pilih Partner'}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectPartnerAsync.displayName = 'InputSelectPartnerAsync';
InputSelectPartnerAsync.defaultProps = {
	name: 'institusi',
	containerClassName: '',
	showLabel: true
};
