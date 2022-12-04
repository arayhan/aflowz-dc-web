import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useKonstituenStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectInstitusi = forwardRef(({ error, onChange, placeholder, showLabel, ...props }, ref) => {
	const { konstituenList, fetchingKonstituenList, getKonstituenList } = useKonstituenStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getKonstituenList();
	}, []);

	useEffect(() => {
		if (konstituenList?.total > 0) {
			const mapKonstituen = konstituenList.items.map((konstituen) => ({
				label: konstituen.name,
				value: konstituen.id
			}));

			setOptions(mapKonstituen);
		}
	}, [konstituenList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Institusi" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingKonstituenList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectInstitusi.displayName = 'InputSelectInstitusi';
InputSelectInstitusi.defaultProps = {
	name: 'institusi'
};
