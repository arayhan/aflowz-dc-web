import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import { useProgramStore } from '@/store';
import React, { useEffect, useState, forwardRef } from 'react';

export const InputSelectProgram = forwardRef(({ error, onChange, placeholder, showLabel, ...props }, ref) => {
	const { programList, fetchingProgramList, getProgramList } = useProgramStore();

	const [options, setOptions] = useState([]);

	useEffect(() => {
		getProgramList();
	}, []);

	useEffect(() => {
		if (programList?.total > 0) {
			const mapProgram = programList.items.map((program) => ({
				label: program.name,
				value: program.id
			}));

			setOptions(mapProgram);
		}
	}, [programList]);

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Program" name={props.name} />
			<InputSelect ref={ref} options={options} loading={fetchingProgramList} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectProgram.displayName = 'InputSelectProgram';
InputSelectProgram.defaultProps = {
	name: 'program'
};
