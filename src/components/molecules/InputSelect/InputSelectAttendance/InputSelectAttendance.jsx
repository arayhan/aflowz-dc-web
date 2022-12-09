import { InputError, InputLabel, InputSelect } from '@/components/atoms';
import React, { forwardRef } from 'react';

export const InputSelectAttendance = forwardRef(({ error, onChange, ...props }, ref) => {
	const options = [
		{ label: 'Tidak Hadir', value: 1 },
		{ label: 'Hadir', value: 2 }
	];

	return (
		<div className="space-y-1">
			<InputLabel text="Pilih Keterangan Absensi" name={props.name} />
			<InputSelect ref={ref} options={options} loading={false} onChange={onChange} {...props} />
			{error && <InputError message={error.message} />}
		</div>
	);
});

InputSelectAttendance.displayName = 'InputSelectAttendance';
