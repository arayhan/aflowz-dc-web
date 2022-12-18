import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProgram = forwardRef(
	({ containerClassName, error, onChange, params, placeholder, showLabel, showPeriodeOnLabel, ...props }, ref) => {
		const { programList, fetchingProgramList, getProgramList } = useProgramStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			if (params) getProgramList({ limit: 1000, offset: 0, ...params });
			else getProgramList();
		}, [params]);

		useEffect(() => {
			if (programList?.total > 0) {
				const mapProgram = programList.items.map((program) => ({
					label: showPeriodeOnLabel ? `${program.name} (${program.periode})` : program.name,
					value: program.id
				}));
				setOptions(mapProgram);
			}
		}, [programList]);

		return (
			<div className={`space-y-1 ${containerClassName}`}>
				{showLabel && <InputLabel text="Pilih Program" name={props.name} />}
				<InputSelect
					ref={ref}
					options={options}
					loading={fetchingProgramList}
					placeholder={placeholder || 'Pilih Program'}
					onChange={onChange}
					{...props}
				/>
				{error && <InputError message={error.message} />}
			</div>
		);
	}
);

InputSelectProgram.displayName = 'InputSelectProgram';
InputSelectProgram.defaultProps = {
	name: 'program',
	containerClassName: '',
	showLabel: true,
	showPeriodeOnLabel: false
};
