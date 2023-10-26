import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useTPSStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectTPS = forwardRef(({ error, onChange, params, ...props }, ref) => {
	const { TPSList, fetchingTPSList, getTPSList } = useTPSStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		const defaultParams = { limit: 10, offset: 0 };
		const requestParams = params ? { ...defaultParams, ...params } : defaultParams;
		getTPSList(requestParams);
	}, [params]);

	useEffect(() => {
		if (TPSList?.total > 0) {
			const mapTPS = TPSList.items.map((tps) => ({
				label: `${tps.name} - ${tps.periode}`,
				value: tps.id
			}));

			setOptions(mapTPS);
		}
	}, [TPSList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih TPS" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingTPSList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectTPS.displayName = 'InputSelectTPS';
