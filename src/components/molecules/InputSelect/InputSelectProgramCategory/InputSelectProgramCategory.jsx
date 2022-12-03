import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProgramCategory = forwardRef(
	({ containerClassName, error, onChange, placeholder, showLabel, ...props }, ref) => {
		const { programCategoryList, fetchingProgramCategoryList, getProgramCategoryList } = useProgramStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			getProgramCategoryList();
		}, []);

		useEffect(() => {
			if (programCategoryList?.total > 0) {
				const mapProgram = programCategoryList.items.map((program) => ({
					label: program.name,
					value: program.id
				}));

				setOptions(mapProgram);
			}
		}, [programCategoryList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Program" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					placeholder="Pilih Mitra"
					loading={fetchingProgramCategoryList}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectProgramCategory.displayName = 'InputSelectProgramCategory';
InputSelectProgramCategory.defaultProps = {
	containerClassName: '',
	name: 'program',
	showLabel: true
};
