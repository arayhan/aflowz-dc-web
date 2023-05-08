import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { usePartnerStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectPartner = forwardRef(({ error, onChange, label, params, ...props }, ref) => {
	const { partnerList, fetchingPartnerList, getPartnerList } = usePartnerStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;
		getPartnerList(requestParams);
	}, [params]);

	useEffect(() => {
		if (partnerList?.total > 0) {
			const mapPartner = partnerList.items.map((partner) => ({
				label: `${partner.nik_number} - ${partner.name}`,
				value: partner.id
			}));

			setOptions(mapPartner);
		}
	}, [partnerList]);

	return (
		<div className="space-y-1">
			<InputLabel text={label || 'Pilih Partner'} name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingPartnerList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectPartner.displayName = 'InputSelectPartner';
