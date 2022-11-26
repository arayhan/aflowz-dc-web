import { InputError, InputLabel } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';
import ReactSelect from 'react-select';

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
			<ReactSelect
				{...props}
				ref={ref}
				onChange={onChange}
				styles={{
					input: (provided) => ({
						...provided,
						'input:focus': {
							boxShadow: 'none'
						}
					})
				}}
				options={options}
			/>
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectMitra.displayName = 'InputSelectMitra';
InputSelectMitra.defaultProps = {
	name: 'mitra'
};
