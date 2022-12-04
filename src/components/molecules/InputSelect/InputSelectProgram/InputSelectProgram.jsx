import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProgram = forwardRef(
	({ containerClassName, error, onChange, placeholder, showLabel, ...props }, ref) => {
		const { programList, fetchingProgramList, getProgramList } = useProgramStore();

		const [options, setOptions] = useState([]);

		useEffect(() => {
			getProgramList({ limit: 0, offset: 0 });
		}, []);

		useEffect(() => {
			if (programList?.total > 0) {
				const mapProgram = programList.items.map((program) => ({ label: program.name, value: program.id }));
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
					placeholder="Pilih Program"
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
	showLabel: true
};
