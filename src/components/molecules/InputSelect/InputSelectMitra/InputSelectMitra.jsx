import { useProgramStore } from '@/store';
import React, { useEffect, useState } from 'react';
import ReactSelect from 'react-select';

export const InputSelectMitra = () => {
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
			<label className="text-sm text-gray-600" htmlFor="category">
				Pilih Mitra
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
				id="category"
				name="category"
				options={options}
			/>
		</div>
	);
};
