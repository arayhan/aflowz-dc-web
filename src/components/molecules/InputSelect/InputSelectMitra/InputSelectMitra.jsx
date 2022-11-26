import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';
import Skeleton from 'react-loading-skeleton';

export const InputSelectMitra = forwardRef(({ error, onChange, ...props }, ref) => {
	const { programCategoryList, fetchingProgramCategoryList, getProgramCategoryList } = useProgramStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getProgramCategoryList();
	}, []);

	useEffect(() => {
		if (programCategoryList?.total > 0) {
			const mapCategory = programCategoryList.items.map((category) => ({
				label: category.name,
				value: category.id
			}));

			setOptions(mapCategory);
		}
	}, [programCategoryList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Mitra" name={props.name} />
			{fetchingProgramCategoryList && <Skeleton height={36} />}
			{!fetchingProgramCategoryList && <InputSelect ref={ref} options={options} onChange={onChange} {...props} />}
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectMitra.displayName = 'InputSelectMitra';
InputSelectMitra.defaultProps = {
	name: 'mitra'
};
