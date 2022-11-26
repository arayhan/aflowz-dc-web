import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectMitra = forwardRef(({ error, onChange, ...props }, ref) => {
	const { programCategoryList, getProgramCategoryList } = useProgramStore();

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
			<InputSelect ref={ref} options={options} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectMitra.displayName = 'InputSelectMitra';
InputSelectMitra.defaultProps = {
	name: 'mitra'
};
